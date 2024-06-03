import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';

export const authGuard: CanActivateFn = () => {
  const tasksService = inject(TasksService);
  const router = inject(Router);
  if (tasksService.token().length > 0) {
    return true;
  } else {
    router.navigate(['/login'], { skipLocationChange: true });
    return false;
  }
};

export const isAuthenticated: CanActivateFn = () => {
  const tasksService = inject(TasksService);
  const router = inject(Router);
  if (tasksService.token().length === 0) {
    return true;
  } else {
    router.navigate(['/dashboard'], { skipLocationChange: true });
    return false;
  }
};