import { useEffect, useState } from 'react';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AlgoPage() {
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/algo-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load portfolio data.');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="page algo" id="algo">
      <div className="algo-content">
        <h2 className="algo-heading">Paper Trading Portfolio</h2>

        {status === 'loading' && <p className="algo-status">Loading…</p>}
        {status === 'error' && (
          <p className="algo-status algo-status-error">Couldn't load portfolio data.</p>
        )}

        {status === 'ready' && (
          <>
            <div className="algo-portfolio-value">
              {data.portfolioValue != null ? currency.format(Number(data.portfolioValue)) : '—'}
            </div>
            {data.generatedAt && (
              <p className="algo-updated">As of {formatDate(data.generatedAt)}</p>
            )}

            <h3 className="algo-trades-heading">Recent Trades</h3>
            {data.trades && data.trades.length > 0 ? (
              <ul className="algo-trades-list">
                {data.trades.map((trade, i) => (
                  <li key={i} className="algo-trade">
                    <span className={`algo-trade-side algo-trade-side-${trade.side}`}>
                      {trade.side}
                    </span>
                    <span className="algo-trade-symbol">{trade.symbol}</span>
                    <span className="algo-trade-qty">{trade.qty} sh</span>
                    <span className="algo-trade-price">
                      {trade.price != null ? currency.format(Number(trade.price)) : '—'}
                    </span>
                    <span className="algo-trade-date">{formatDate(trade.filledAt)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="algo-status">No trades yet.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
