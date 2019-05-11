
import React from 'react';
import { AlgList } from './components/AlgList';
import { MenuBar } from './components/MenuBar';

export type AppProps = any;

export class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <MenuBar />
        <AlgList />
      </div>
    );
  }
}