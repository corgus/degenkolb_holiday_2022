import { Component,
         OnInit } from '@angular/core'
import { Router,
         ActivatedRoute } from '@angular/router'

import { AuthService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-path-not-found',
  templateUrl: 'path-not-found.component.html'
})

export class PathNotFoundComponent implements OnInit {
  model: any = {}
  loading = false

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {}
}
