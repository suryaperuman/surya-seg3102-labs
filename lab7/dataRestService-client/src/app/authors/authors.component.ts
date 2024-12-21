import { Component, OnInit} from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthorComponent } from './author/author.component';

export const authorsRoutes: Routes = [
  {path: ':id', component: AuthorComponent }
]


@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})

export class AuthorsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  submit(authorId: string): void {
    this.router.navigate(['./', authorId], { relativeTo: this.route });
  }

}
