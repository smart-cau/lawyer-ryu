'use client';

import { useEffect, useRef } from 'react';

import { CONTACT, NAVER_MAP_URL, OFFICE_LOCATION } from '@/lib/constants';

interface NaverMapProps {
  className?: string;
}

const NCPID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const SCRIPT_SRC = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NCPID}`;

/**
 * Load the Naver Maps SDK once and resolve when ready.
 * Subsequent calls return the same promise.
 */
let sdkPromise: Promise<void> | null = null;

function loadNaverMapsSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise;

  if (typeof window !== 'undefined' && window.naver?.maps) {
    sdkPromise = Promise.resolve();
    return sdkPromise;
  }

  sdkPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Naver Maps SDK'));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

export default function NaverMap({ className }: NaverMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadNaverMapsSdk()
      .then(() => {
        if (cancelled || !containerRef.current || mapRef.current) return;

        const position = new naver.maps.LatLng(
          OFFICE_LOCATION.lat,
          OFFICE_LOCATION.lng,
        );

        const map = new naver.maps.Map(containerRef.current, {
          center: position,
          zoom: 16,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
          },
        });

        const marker = new naver.maps.Marker({ position, map });

        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div style="padding:12px 16px; min-width:200px; font-family:sans-serif;">
              <strong style="font-size:14px;">${OFFICE_LOCATION.name}</strong>
              <p style="margin:6px 0 8px; font-size:13px; color:#555; line-height:1.4;">
                ${CONTACT.address}
              </p>
              <a href="${NAVER_MAP_URL}" target="_blank" rel="noopener noreferrer"
                 style="font-size:13px; color:#03C75A; text-decoration:none; font-weight:600;">
                네이버 지도에서 보기 &rarr;
              </a>
            </div>
          `,
          borderColor: '#e5e7eb',
          borderWidth: 1,
        });

        infoWindow.open(map, marker);

        naver.maps.Event.addListener(marker, 'click', () => {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        });

        naver.maps.Event.addListener(map, 'click', () => {
          infoWindow.close();
        });

        mapRef.current = map;
      })
      .catch(() => {
        // SDK load failure — silently degrade (map area stays empty)
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        try {
          mapRef.current.destroy();
        } catch {
          // Naver Maps SDK can throw when the container DOM node
          // has already been removed by React before cleanup runs.
        }
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
