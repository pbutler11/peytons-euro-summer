import { Banner } from '@/components/homepage/Banner';
import { StatusBar } from '@/components/homepage/StatusBar';
import { Sidebar } from '@/components/homepage/Sidebar';
import { MainContent } from '@/components/homepage/MainContent';

export default function Home() {
  return (
    <>
      <Banner />
      <StatusBar />
      <div className="page-layout">
        <Sidebar />
        <MainContent />
      </div>
    </>
  );
}