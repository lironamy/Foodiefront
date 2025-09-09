import { Component, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods: Food[] = [];
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of items
  page = 1;
  index = 0;

  // Number of items per page (optional)
  itemsPerPage: number = 10;

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.loadFoods();
    this.page = 1;
    
  }
  
  loadFoods() {
    let foodsObservable: Observable<Food[]>;

    this.activatedRoute.params.subscribe(params => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      else
        foodsObservable = this.foodService.getAll();

      foodsObservable.subscribe(serverFoods => {
        this.totalItems = serverFoods.length;
        this.foods = serverFoods;
        this.updatePagedFoods(); // Update the pagedFoods array
      });
    });
  }

  // Paged foods
  pagedFoods: Food[] = [];

  // Update the pagedFoods array

  updatePagedFoods() {
    this.pagedFoods = this.foods.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  }

  // Update the page number

  updatePageNumber(pageNumber: number) {
    this.page = pageNumber;
    this.updatePagedFoods();
  }

  // Next page

  nextPage() {
    if (this.page < this.foods.length / this.itemsPerPage) {
      this.page++;
      this.updatePagedFoods();
      this.scrollToTop();
    }
  }

  // Previous page

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagedFoods();
    }
  }

  // First page

  firstPage() {
    this.page = 1;
    this.updatePagedFoods();
  }

  // Last page

  lastPage() {
    this.page = Math.ceil(this.foods.length / this.itemsPerPage);
    this.updatePagedFoods();
  }

  // Page changed event

  scrollToTop() {
    const top = document.getElementById('top');top?.scrollIntoView({ behavior: 'smooth'});
  }

  btnClicked() {
    this.scrollToTop();
  }
  
  

  pageChanged(event: any) {
    console.log('Page changed event triggered.');
    this.page = event.page;
    this.updatePagedFoods();
  }
  
}
