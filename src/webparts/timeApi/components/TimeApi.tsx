import * as React from 'react';
import styles from './TimeApi.module.scss';
import { ITimeApiProps } from './ITimeApiProps';
import axios from 'axios';

export default class TimeApi extends React.Component<ITimeApiProps, {}> {

  async componentDidMount(): Promise<void> {
    let apiUrl="https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
      let timezonesApi=await axios.get(apiUrl, {
        headers:{
          Accept: "application/json"
        }
      });
      let times=timezonesApi.data;
      console.table(times);
  }

  public render(): React.ReactElement<ITimeApiProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.timeApi} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
hola api
        </div>
      </section>
    );
  }
}
