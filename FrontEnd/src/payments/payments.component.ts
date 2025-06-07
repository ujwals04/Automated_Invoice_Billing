import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  payments = [
    {
      invoiceId: 'INV-001',
      remainders: ['2025-05-01', '2025-06-01', '2025-07-01'],
      amounts: [150.00, 200.00, 250.00],
      received: true
    },
    {
      invoiceId: 'INV-002',
      remainders: ['2025-05-05', '2025-06-05', '2025-07-05'],
      amounts: [120.00, 180.00, 210.00],
      received: false
    },
    {
      invoiceId: 'INV-003',
      remainders: ['2025-05-10', '2025-06-10', '2025-07-10'],
      amounts: [220.00, 180.00, 230.00],
      received: true
    },
    {
      invoiceId: 'INV-004',
      remainders: ['2025-05-15', '2025-06-15', '2025-07-15'],
      amounts: [300.00, 250.00, 200.00],
      received: false
    },
    {
      invoiceId: 'INV-005',
      remainders: ['2025-05-20', '2025-06-20', '2025-07-20'],
      amounts: [450.00, 300.00, 350.00],
      received: true
    },
    {
      invoiceId: 'INV-001',
      remainders: ['2025-05-01', '2025-06-01', '2025-07-01'],
      amounts: [150.00, 200.00, 250.00],
      received: true
    },
    {
      invoiceId: 'INV-002',
      remainders: ['2025-05-05', '2025-06-05', '2025-07-05'],
      amounts: [120.00, 180.00, 210.00],
      received: false
    },
    {
      invoiceId: 'INV-003',
      remainders: ['2025-05-10', '2025-06-10', '2025-07-10'],
      amounts: [220.00, 180.00, 230.00],
      received: true
    },
    {
      invoiceId: 'INV-004',
      remainders: ['2025-05-15', '2025-06-15', '2025-07-15'],
      amounts: [300.00, 250.00, 200.00],
      received: false
    },
    {
      invoiceId: 'INV-005',
      remainders: ['2025-05-20', '2025-06-20', '2025-07-20'],
      amounts: [450.00, 300.00, 350.00],
      received: true
    },
    {
      invoiceId: 'INV-001',
      remainders: ['2025-05-01', '2025-06-01', '2025-07-01'],
      amounts: [150.00, 200.00, 250.00],
      received: true
    },
    {
      invoiceId: 'INV-002',
      remainders: ['2025-05-05', '2025-06-05', '2025-07-05'],
      amounts: [120.00, 180.00, 210.00],
      received: false
    },
    {
      invoiceId: 'INV-003',
      remainders: ['2025-05-10', '2025-06-10', '2025-07-10'],
      amounts: [220.00, 180.00, 230.00],
      received: true
    },
    {
      invoiceId: 'INV-004',
      remainders: ['2025-05-15', '2025-06-15', '2025-07-15'],
      amounts: [300.00, 250.00, 200.00],
      received: false
    },
    {
      invoiceId: 'INV-005',
      remainders: ['2025-05-20', '2025-06-20', '2025-07-20'],
      amounts: [450.00, 300.00, 350.00],
      received: true
    },
    {
      invoiceId: 'INV-001',
      remainders: ['2025-05-01', '2025-06-01', '2025-07-01'],
      amounts: [150.00, 200.00, 250.00],
      received: true
    },
    {
      invoiceId: 'INV-002',
      remainders: ['2025-05-05', '2025-06-05', '2025-07-05'],
      amounts: [120.00, 180.00, 210.00],
      received: false
    },
    {
      invoiceId: 'INV-003',
      remainders: ['2025-05-10', '2025-06-10', '2025-07-10'],
      amounts: [220.00, 180.00, 230.00],
      received: true
    },
    {
      invoiceId: 'INV-004',
      remainders: ['2025-05-15', '2025-06-15', '2025-07-15'],
      amounts: [300.00, 250.00, 200.00],
      received: false
    },
    {
      invoiceId: 'INV-005',
      remainders: ['2025-05-20', '2025-06-20', '2025-07-20'],
      amounts: [450.00, 300.00, 350.00],
      received: true
    }
  ];
}
