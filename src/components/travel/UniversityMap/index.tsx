import React, { useState, useRef, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocaleData } from '@site/src/data/australia';
import styles from './index.module.css';

interface University {
  name_en: string;
  name_zh: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  website: string;
  group: string;
  founded: number;
  qs_rank: number;
  tuition_min: number;
  tuition_max: number;
}

const GROUP_COLORS: Record<string, string> = {
  Go8: '#2196F3',
  ATN: '#4CAF50',
  IRU: '#FF9800',
  RUN: '#9C27B0',
  '': '#9E9E9E',
};

const FILTER_GROUPS = ['All', 'Go8', 'ATN', 'IRU', 'RUN', 'Other'] as const;

function getGroupColor(group: string): string {
  return GROUP_COLORS[group] ?? '#9E9E9E';
}

function getDisplayName(uni: University, locale: string): string {
  return locale === 'zh' ? uni.name_zh : uni.name_en;
}

function formatTuition(min: number, max: number): string {
  return `$${Math.round(min / 1000)},000 - $${Math.round(max / 1000)},000`;
}

/** Inner map component that uses react-leaflet (only rendered in browser) */
function MapInner({
  universities,
  locale,
  selectedUni,
  onSelectUni,
  mapRef,
}: {
  universities: University[];
  locale: string;
  selectedUni: University | null;
  onSelectUni: (uni: University) => void;
  mapRef: React.MutableRefObject<any>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const L = require('leaflet');
  const {
    MapContainer,
    TileLayer,
    CircleMarker,
    Tooltip,
    useMap,
  } = require('react-leaflet');

  require('leaflet/dist/leaflet.css');

  /** Small helper component to expose map instance via ref */
  function MapRefSetter() {
    const map = useMap();
    mapRef.current = map;
    return null;
  }

  return (
    <MapContainer
      center={[-25.5, 134.5]}
      zoom={4}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={true}
    >
      <MapRefSetter />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {universities.map((uni, idx) => (
        <CircleMarker
          key={idx}
          center={[uni.lat, uni.lng]}
          radius={8}
          pathOptions={{
            color: getGroupColor(uni.group),
            fillColor: getGroupColor(uni.group),
            fillOpacity: selectedUni === uni ? 1 : 0.7,
            weight: selectedUni === uni ? 3 : 1,
          }}
          eventHandlers={{
            click: () => onSelectUni(uni),
          }}
        >
          <Tooltip>{getDisplayName(uni, locale)}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default function UniversityMap(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const { universities } = useLocaleData() as { universities: University[] };

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const mapRef = useRef<any>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const filteredUniversities = universities.filter((uni) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Other') return !uni.group || !GROUP_COLORS[uni.group] || uni.group === '';
    return uni.group === activeFilter;
  });

  const handleCardClick = useCallback(
    (uni: University) => {
      setSelectedUni(uni);
      if (mapRef.current) {
        mapRef.current.flyTo([uni.lat, uni.lng], 10, { duration: 1 });
      }
    },
    [],
  );

  const handleMarkerClick = useCallback(
    (uni: University) => {
      setSelectedUni(uni);
      const idx = filteredUniversities.indexOf(uni);
      if (idx === -1) {
        // Uni might not be in current filter, switch to All
        setActiveFilter('All');
      }
      // Scroll to card
      setTimeout(() => {
        const uniIdx = universities.indexOf(uni);
        const el = cardRefs.current.get(uniIdx);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    },
    [filteredUniversities, universities],
  );

  const filterLabel = (group: string) => {
    if (group === 'All')
      return translate({ id: 'aus.uni.all', message: 'All' });
    if (group === 'Other')
      return translate({ id: 'aus.uni.filter.other', message: 'Other' });
    return group;
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapPane}>
        <BrowserOnly fallback={<div style={{ height: '100%', background: 'var(--ifm-background-color)' }} />}>
          {() => (
            <MapInner
              universities={filteredUniversities}
              locale={locale}
              selectedUni={selectedUni}
              onSelectUni={handleMarkerClick}
              mapRef={mapRef}
            />
          )}
        </BrowserOnly>
      </div>

      <div className={styles.sidePanel}>
        <div className={styles.filterRow}>
          {FILTER_GROUPS.map((g) => (
            <button
              key={g}
              className={`${styles.filterBtn} ${activeFilter === g ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(g)}
            >
              {filterLabel(g)}
            </button>
          ))}
        </div>

        <div className={styles.uniList} ref={listRef}>
          {filteredUniversities.map((uni) => {
            const globalIdx = universities.indexOf(uni);
            const isSelected = selectedUni === uni;
            return (
              <div
                key={globalIdx}
                ref={(el) => {
                  if (el) cardRefs.current.set(globalIdx, el);
                }}
                className={`${styles.uniCard} ${isSelected ? styles.uniCardSelected : ''}`}
                onClick={() => handleCardClick(uni)}
              >
                <div className={styles.uniName}>
                  {getDisplayName(uni, locale)}
                  {uni.group && (
                    <span
                      className={styles.groupBadge}
                      style={{ backgroundColor: getGroupColor(uni.group) }}
                    >
                      {uni.group}
                    </span>
                  )}
                </div>
                <div className={styles.uniMeta}>
                  {uni.city}, {uni.state}
                </div>
                <div className={styles.uniMeta}>
                  {translate({ id: 'aus.uni.qsRank', message: 'QS Rank' })}:{' '}
                  #{uni.qs_rank}
                </div>
                <div className={styles.uniMeta}>
                  {translate({ id: 'aus.uni.tuition', message: 'Tuition' })}:{' '}
                  {formatTuition(uni.tuition_min, uni.tuition_max)}/
                  {translate({ id: 'aus.uni.perYear', message: 'yr' })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
