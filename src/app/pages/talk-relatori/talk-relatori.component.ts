import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Relatore, RelatoriService } from '../../service/relatori.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'talk-relatori',
  templateUrl: './talk-relatori.component.html',
  standalone: true,
  imports: [NgForOf, RouterLink],
  styleUrls: ['./talk-relatori.component.css']
})
export class TalkRelatoriComponent implements OnInit {
  relatori: Relatore[] = [];

  constructor(private relatoriService: RelatoriService) {}

  ngOnInit(): void {
    this.relatoriService.getRelatori().subscribe((data) => {
      this.relatori = data;
    });
  }
}
