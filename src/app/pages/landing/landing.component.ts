import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { UserService } from '../../common/user.service';
import { InputComponent } from '../../components/input/input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ChartComponent } from '../../components/chart/chart.component';
// interface Customer {
//   id: number;
//   name: string;
//   transactions?: Transaction[];
// }

// interface Transaction {
//   id: number;
//   customer_id: number;
//   date: string;
//   amount: number;
// }

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    TableComponent,
    InputComponent,
    CommonModule,
    DropdownComponent,
    ChartComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  data = signal<any[]>([]);
  searchedNameArr!: any[] | undefined;
  isFilteringFromNameToAmount: boolean = false;
  isLoading = false;
  disableSearchByAmount: string = 'none';
  disableSearchByCustomer: string = 'none';
  selector = [{ name: 'customer' }, { name: 'amount' }];
  dateArr = new BehaviorSubject<any[]>([]);
  amountArr = new BehaviorSubject<any[]>([]);

  constructor(private _user: UserService) {
    this.data.set(_user.userData.customers);
    let { transactions } = _user.userData;

    this.data().forEach((customer) => {
      customer.transactions = transactions.filter((transaction) => {
        return transaction.customer_id === customer.id;
      });
    });
  }

  ngOnInit(): void {
    this.searchForCustomerName();
    this.searchForTransactionAmount();
    this.checkForSearchSelection();
    this.displayTransactionsPerDayForSelectedCustomer();
  }

  searchFormGroup: FormGroup = new FormGroup({
    searchSelector: new FormControl<any>(null),
    searchedCustomerName: new FormControl(''),
    searchedTransactionAmount: new FormControl(''),
  });

  chartFormGroup: FormGroup = new FormGroup({
    selectedCustomer: new FormControl(''),
  });

  searchForCustomerName() {
    this.searchFormGroup.controls['searchedCustomerName'].valueChanges
      .pipe(
        tap(() => (this.isLoading = true)),
        debounceTime(1000)
      )
      .subscribe((res) => {
        if (res) {
          this.searchedNameArr = this.data().filter((user) => {
            return user.name.toLowerCase().startsWith(res.toLowerCase());
          });
        } else {
          this.searchedNameArr = undefined;
        }

        this.isLoading = false;
      });
  }

  searchForTransactionAmount() {
    let item: any[];
    let newUser: any;
    this.searchFormGroup.controls['searchedTransactionAmount'].valueChanges
      .pipe(
        tap(() => (this.isLoading = true)),
        debounceTime(1000)
      )
      .subscribe((res) => {
        if (res) {
          this.searchedNameArr = this.data().map((user) => {
            item = user.transactions.filter((transaction: any) => {
              return transaction.amount === +res;
            });

            if (item.length) {
              newUser = JSON.parse(JSON.stringify(user));
              newUser.transactions = [...item];
              return newUser;
            } else return '';
          });
          this.searchedNameArr = this.searchedNameArr.filter((e) => e !== '');
        } else {
          this.searchedNameArr = undefined;
        }

        this.isLoading = false;
      });
  }

  checkForSearchSelection() {
    this.searchFormGroup.controls['searchSelector'].valueChanges.subscribe(
      (selector) => {
        if (selector === 'customer') {
          this.disableSearchByAmount = 'none';
          this.disableSearchByCustomer = 'block';
          this.searchFormGroup.controls['searchedTransactionAmount'].setValue(
            ''
          );
        } else if (selector === 'amount') {
          this.disableSearchByCustomer = 'none';
          this.disableSearchByAmount = 'block';
          this.searchFormGroup.controls['searchedCustomerName'].setValue('');
        }
      }
    );
  }

  displayTransactionsPerDayForSelectedCustomer() {
    this.chartFormGroup.controls['selectedCustomer'].valueChanges.subscribe(
      (customer) => {
        this.dateArr.next(
          customer?.transactions?.map((each: any) => {
            return each.date;
          })
        );

        this.amountArr.next(
          customer?.transactions?.map((each: any) => {
            return each.amount;
          })
        );
      }
    );
  }
}
