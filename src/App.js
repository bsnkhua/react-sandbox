import { useState } from 'react';
import './App.css';
import ShowHideBox from './components/show-hide-box';
import ChangeInput from './components/change-input';
import Counter from './components/counter';
import ThemeSwitch from './components/theme-switch';
import NotesList from './components/notes-list';
import FilmsList from './components/filsm-list';
import ShoppingList from './components/shopping-list';
import DailyChecklist from './components/daily-checklist';
import RandomQuote from './components/random-quote';
import PhraseConstructor from './components/phrase-constructor';
import MiniSurvey from './components/mini-survey';
import DiceGame from './components/dice-game';
import DiceGameMultiplayer from './components/dice-game-multiplayer';
import ShoppingListTotal from './components/shopping-list-total';
import ListMoviesFiltered from './components/list-movies-filtered';
import UniqueNumbersTracker from './components/unique-numbers-tracker';
import MovieRatings from './components/movie-ratings';
import TaskManager from './components/task-manager';
import ShoppingApp from './components/shopping-list/shopping-app';
import HabitApp from './components/habit-tracker/habit-app';
import BookApp from './components/book-tracker-app/book-app';
import NoteSaverApp from './components/simple-note-saver/note-saver-app';
import ExpenseTrackerApp from './components/expense-tracker/expense-tracker-app';
import QuizApp from './components/expense-tracker/quiz-app/quiz-app';

function App() {

  return (
    <div className="App">
      <QuizApp />
      <ExpenseTrackerApp />
      <BookApp />
      <NoteSaverApp />
      <HabitApp />
      <ShoppingApp />
      <TaskManager />
      <MovieRatings />
      <UniqueNumbersTracker />
      <ListMoviesFiltered />
      <ShoppingListTotal />
      <DiceGameMultiplayer />
      <DiceGame />
      <MiniSurvey />
      <PhraseConstructor />
      <RandomQuote />
      <DailyChecklist />
      <ShowHideBox />
      <ChangeInput />
      <Counter />
      <ThemeSwitch />
      <NotesList />
      <FilmsList />
      <ShoppingList />
    </div>
  );
}

export default App;
