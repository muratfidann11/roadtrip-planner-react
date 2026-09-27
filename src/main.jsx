import React from 'react';import {createRoot} from 'react-dom/client';import {Provider,useDispatch,useSelector} from 'react-redux';
import 'primereact/resources/themes/lara-light-blue/theme.css';import 'primereact/resources/primereact.min.css';import 'primeicons/primeicons.css';import './styles.css';
import {store} from './app-store/cns/store';import {CITY_DATA} from './data/cityData';import {DATE_OPTIONS,SCREEN} from './app-date-pick/cns/constants';
import {startPlanning,goCities,toggleDate,selectCity,selectCategory,setScore,submitRound,nextCategory,resetPlanning} from './app-date-pick/act/planningActions';
import WelcomeContainer from './app-welcome/cnt/WelcomeContainer';import DatePickContainer from './app-date-pick/cnt/DatePickContainer';import CityPickContainer from './app-city-pick/cnt/CityPickContainer';import CategoryContainer from './app-category-pick/cnt/CategoryContainer';import VoteContainer from './app-vote/cnt/VoteContainer';import ResultContainer from './app-result/cnt/ResultContainer';import FinalContainer from './app-result/cnt/FinalContainer';
function App(){const d=useDispatch();const s=useSelector(x=>x.planning);const cats=s.city?CITY_DATA[s.city].categories:[];const cat=cats[s.catIndex];
 if(s.screen===SCREEN.WELCOME)return <WelcomeContainer onStart={()=>d(startPlanning())}/>;
 if(s.screen===SCREEN.DATES)return <DatePickContainer selected={s.dates} onToggle={i=>d(toggleDate(i))} onNext={()=>d(goCities())}/>;
 if(s.screen===SCREEN.CITIES)return <CityPickContainer onPick={c=>d(selectCity(c))}/>;
 if(s.screen===SCREEN.CATEGORIES)return <CategoryContainer city={s.city} categories={cats} winners={s.winners} onPick={i=>d(selectCategory(i))}/>;
 if(s.screen===SCREEN.VOTE)return <VoteContainer category={cat} round={s.round} current={s.scores[cat.id]?.current||{}} eliminated={s.scores[cat.id]?.eliminated||[]} onScore={(name,score)=>d(setScore({categoryId:cat.id,name,score}))} onSubmit={()=>d(submitRound())}/>;
 if(s.screen===SCREEN.RESULT)return <ResultContainer winner={s.winners[cat.id]} onNext={()=>d(nextCategory())}/>;
 return <FinalContainer city={s.city} categories={cats} winners={s.winners} dates={s.dates.map(i=>DATE_OPTIONS[i])} onReset={()=>d(resetPlanning())}/>;
}
createRoot(document.getElementById('root')).render(<Provider store={store}><App/></Provider>);
