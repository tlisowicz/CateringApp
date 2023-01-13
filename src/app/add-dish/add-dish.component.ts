import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Dish } from '../shared/dish';
import { FileUploaderService } from '../services/file-uploader.service';
import { positiveFloatValidator, positiveIntValidator, stringValidator } from '../shared/FormFieldsValidators';
import { DishFetchService } from '../services/dish-fetch.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent {

  id:number = 10000;
  imgPreview: any = [];
  constructor(
    private fb: FormBuilder, 
    private fileUploader: FileUploaderService,
    private dishService: DishFetchService) 
    {
      this.dishService.getLastDishID().subscribe(id => this.id = id);
    }

  dishData = this.fb.group({
    img: [['']] ,
    name : ['', [Validators.required, stringValidator(/^(?!\s*$).+/)]],
    kitchenType : ['',[Validators.required, stringValidator(/^(?!\s*$).+/)]],
    category : ['',Validators.required],
    typeByIngredients : ['',Validators.required],
    description : [''],
    price : [0 ,[Validators.required, positiveFloatValidator()]],
    servingsPerDay : [1, [Validators.required, positiveIntValidator()]],
    ingredients : this.fb.array([this.fb.control('')]),
  });


  categories: string [] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Supper",
  ];

  types: string [] = [
    "Non-vegetarian",
    "Vegetarian",
    "Vegan",
  ];

  get ingredients() {
    return this.dishData.get('ingredients') as FormArray;
  }

  get name() { return this.dishData.get('name'); }
  get kitchenType() { return this.dishData.get('kitchenType'); }
  get price() { return this.dishData.get('price'); }
  get servingsPerDay() { return this.dishData.get('servingsPerDay'); }

  addIngredient() {
    this.ingredients.push(this.fb.control('', [Validators.required, stringValidator(/^(?!\s*$).+/)]));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }
  
  onSubmit() {
    if (this.dishData.invalid) {
      alert("Some fields have invalid values");
      return;
    }
    if (this.imgPreview.length > 0) {
      this.dishData.patchValue({img: this.imgPreview as string[]});

    }
    this.dishService.addDish(this.makeDish()).subscribe();
    alert('Dish added!');
    this.dishData.reset();
    this.setInitialValues();
    this.imgPreview = [];
  }
  
  makeDish(): Dish {
    return {
      id: this.id as number,
      img: this.dishData.value.img as string[],
      name: this.dishData.value.name as string,
      kitchenType: this.dishData.value.kitchenType as string,
      category: this.dishData.value.category as string,
      typeByIngredients: this.dishData.value.typeByIngredients as string,
      description: this.dishData.value.description as string,
      price: this.dishData.value.price as number,
      servingsPerDay: this.dishData.value.servingsPerDay as number,
      ingredients: this.dishData.value.ingredients as string[],
      avarageRating: null,
    }
  }

  setInitialValues() {
    this.dishData.patchValue({
      img: [''],
      name: '',
      kitchenType: '',
      category: '',
      typeByIngredients: '',
      description: '',
      price: 0,
      servingsPerDay: 1,
      ingredients: [''],
    });
  }

   loadPreview(event: any) {
    Promise.all(this.fileUploader.loadPreview(event)).then((results) => {
      for (let result of results) {
        this.imgPreview.push(result);
      }
    });
   }
}
