import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Relatore, RelatoriService} from '../../service/relatori.service';
import Swiper from 'swiper';

@Component({
  selector: 'talk-relatori',
  templateUrl: './talk-relatori.component.html',
  standalone: true,
  imports: [NgForOf],
  styleUrls: ['./talk-relatori.component.css']
})
export class TalkRelatoriComponent implements OnInit {
  relatori: Relatore[] = [];

  constructor(private relatoriService: RelatoriService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit TalkRelatoriComponent chiamato');
    this.relatoriService.getRelatori().subscribe((data) => {
      this.relatori = data;
      console.log('Relatori ricevuti:', data);
    });
  }



}
