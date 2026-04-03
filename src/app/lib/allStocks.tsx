import s1 from '../../data/stocks01.json';
import s2 from '../../data/stocks02.json';
import s3 from '../../data/stocks03.json';
import s4 from '../../data/stocks04.json';
import s5 from '../../data/stocks05.json';
import s6 from '../../data/stocks06.json';

export default function allStocks() {
  const raw = [s1, s2, s3, s4, s5, s6].flat();
  return raw.map(el => ({
		companyName: el.c1,
		stockSymbol: el.c2,
		sector: el.c3,
		subsector: el.c4,
		listingDate: new Date(el.c5).toLocaleDateString('en-US',{dateStyle: 'long'})
	}));
}

