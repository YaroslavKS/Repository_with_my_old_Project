import { Component, forwardRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

interface CurrencyResponse {
  cc: string;
  rate: number;
  exchangedate: string;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConverterComponent),
      multi: true
    }
  ]
})
export class ConverterComponent implements ControlValueAccessor, OnInit {
  sourceUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  response: CurrencyResponse[] = [];
  rates: { [key: string]: number } = {};
  currentData = '';
  converterForm: FormGroup;
  toggle = false;
  currentCourseOfUsd = 0;
  currentCourseOfEur = 0;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.converterForm = this.formBuilder.group({
      inputValueFrom: ['', Validators.required],
      inputValueTo: ['', Validators.required],
      inputTypeFrom: ['UAH', Validators.required],
      inputTypeTo: ['USD', Validators.required]
    });
  }

  correction(value: number): number {
    return parseFloat(value.toFixed(2));
  }

  calculateConversion(): void {
    const value = parseFloat(this.converterForm.value.inputValueFrom.replace(/,/g, ''));
    const fromRate = this.rates[this.converterForm.value.inputTypeFrom];
    const toRate = this.rates[this.converterForm.value.inputTypeTo];

    if (fromRate && toRate) {
      this.converterForm.patchValue({
        inputValueTo: (value / fromRate) * toRate
      });
    } else {
      this.converterForm.patchValue({
        inputValueTo: 0
      });
    }

    if (this.converterForm.value.inputValueTo !== undefined) {
      const correctedValue = this.correction(this.converterForm.value.inputValueTo);
      this.converterForm.patchValue({
        inputValueTo: correctedValue
      });
    }
  }

  inputFromHandler(): void {
    this.calculateConversion();
    this.propagateChange(this.converterForm.value);
  }

  inputToHandler(): void {
    const fromRate = this.rates[this.converterForm.value.inputTypeFrom];
    const toRate = this.rates[this.converterForm.value.inputTypeTo];

    if (fromRate && toRate) {
      this.converterForm.patchValue({
        inputValueFrom: (this.converterForm.value.inputValueTo / toRate) * fromRate
      });
    } else {
      this.converterForm.patchValue({
        inputValueFrom: 0
      });
    }

    if (this.converterForm.value.inputValueFrom !== undefined) {
      const correctedValue = this.correction(this.converterForm.value.inputValueFrom);
      this.converterForm.patchValue({
        inputValueFrom: correctedValue
      });
    }
    this.propagateChange(this.converterForm.value);
  }

  onInputConvertFromChange(): void {
    this.calculateConversion();
    this.propagateChange(this.converterForm.value);
  }

  onInputConvertToChange(): void {
    const fromRate = this.rates[this.converterForm.value.inputTypeFrom];
    const toRate = this.rates[this.converterForm.value.inputTypeTo];

    if (fromRate && toRate) {
      this.converterForm.patchValue({
        inputValueFrom: (this.converterForm.value.inputValueTo / toRate) * fromRate
      });
    } else {
      this.converterForm.patchValue({
        inputValueFrom: 0
      });
    }

    if (this.converterForm.value.inputValueFrom !== undefined) {
      const correctedValue = this.correction(this.converterForm.value.inputValueFrom);
      this.converterForm.patchValue({
        inputValueFrom: correctedValue
      });
    }
    this.propagateChange(this.converterForm.value);
  }

  ngOnInit(): void {
    this.http.get<CurrencyResponse[]>(this.sourceUrl).subscribe((response) => {
      this.response = response;
      this.response.forEach((element: CurrencyResponse) => {
        this.rates[element.cc] = element.rate;
        this.currentData = element.exchangedate;
        if (element.cc === 'USD') {
          this.currentCourseOfUsd = element.rate;
        }
        if (element.cc === 'EUR') {
          this.currentCourseOfEur = element.rate;
        }
      });
      this.toggle = true;
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.converterForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.converterForm.disable();
    } else {
      this.converterForm.enable();
    }
  }

  private propagateChange = (_: any) => {};
}
