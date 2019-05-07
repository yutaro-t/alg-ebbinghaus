
import React from 'react';
import { AlgList } from './components/AlgList';

export type AppProps = any;

export class App extends React.Component<AppProps> {
  render() {
    return <AlgList />;
  }
}