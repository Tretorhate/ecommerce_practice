import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductInfoService } from '../../../../shared/services/product-info/product-info.service';

@Component({
  selector: 'review-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
})
export class ReviewFormComponent {
  constructor(private ProductInfoService: ProductInfoService) {}
  isFormLoading = signal(false);
  reviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    text: new FormControl('')
  });
  sendReview(){
    this.isFormLoading.set(true)
   const rating = Number(this.reviewForm.get('rating')?.value);
    const text = this.reviewForm.get('text')?.value!;
    this.ProductInfoService.postReview({text, rating}).subscribe({
      next:(res) =>{
        this.isFormLoading.set(false)
        this.reviewForm.reset();
      },
      error:(err)=>{
        this.isFormLoading.set(false)
      }
    })
  
  }
}
