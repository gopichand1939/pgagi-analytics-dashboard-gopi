import DashboardLayout from '@/components/layout/DashboardLayout';
import StockCard from '@/features/stocks/StockCard';
import { useTranslation } from 'react-i18next';

export default function StocksPage() {
  const { t } = useTranslation();
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">{t('stocks')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockSymbols.map((symbol) => (
            <StockCard key={symbol} symbol={symbol} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}