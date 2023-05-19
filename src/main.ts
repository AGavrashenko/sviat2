import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { differenceInDays, formatDistance, intervalToDuration } from 'date-fns';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-2">
      <h1>Святослав</h1>
      <div>{{diffInWeeks}}</div>
      <div>{{duration}}</div>
    </div>
  `,
})
export class App {
  birthDate = new Date(2022, 6, 21, 6, 6, 0);

  diffDuration = intervalToDuration({
    start: this.birthDate,
    end: new Date(),
  });

  diffInWeeks: string = this._getWeeks();
  duration: string = '';

  constructor() {
    this._updateDuration();

    setInterval(() => {
      this._updateDuration();
    }, 1000);
  }

  private _getWeeks(): string {
    const fullDays = differenceInDays(new Date(), this.birthDate);
    const fullWeeks = Math.round(fullDays / 7);
    const restDays = fullDays % 7;

    return `Тижнів ${fullWeeks}` + (restDays ? `, днів: ${restDays}` : '');
  }

  private _updateDuration(): void {
    const diffDuration = intervalToDuration({
      start: this.birthDate,
      end: new Date(),
    });

    this.duration = `${diffDuration.years} років, ${diffDuration.months} місяців, ${diffDuration.days} днів, ${diffDuration.hours} годин, ${diffDuration.seconds} секунд`;
  }
}

bootstrapApplication(App);
