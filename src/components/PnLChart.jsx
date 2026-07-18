import { useEffect, useRef } from 'react';
import { createChart, AreaSeries, ColorType } from 'lightweight-charts';

export default function PnLChart({ history }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !history || history.length === 0) return;

    const isPositive = Number(history[history.length - 1].equity) >= Number(history[0].equity);
    const lineColor = isPositive ? '#3a7a4e' : '#a33b3b';
    const topColor = isPositive ? 'rgba(58, 122, 78, 0.3)' : 'rgba(163, 59, 59, 0.3)';
    const bottomColor = isPositive ? 'rgba(58, 122, 78, 0.02)' : 'rgba(163, 59, 59, 0.02)';

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#79676a',
        fontFamily: 'Merriweather, serif',
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(121, 103, 106, 0.15)' },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      crosshair: {
        vertLine: { color: '#79676a', labelBackgroundColor: '#262626' },
        horzLine: { color: '#79676a', labelBackgroundColor: '#262626' },
      },
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor,
      bottomColor,
      lineWidth: 2,
      priceFormat: { type: 'price', precision: 0, minMove: 1 },
    });

    series.setData(history.map((p) => ({ time: p.time, value: Number(p.equity) })));
    chart.timeScale().fitContent();

    function handleResize() {
      chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [history]);

  return <div className="algo-chart" ref={containerRef} />;
}
