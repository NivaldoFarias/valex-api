import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';

import * as repository from '../repositories/card.repository';

import TransactionTypes from '../types/transaction.type';
import Employee from '../interfaces/employee.interface';
import Card from '../interfaces/card.interface';

async function newCard(employee: Employee, cardType: TransactionTypes) {
  const cryptrSecret = process.env.CRYPTR_SECRET ?? 'secret';
  const cryptr = new Cryptr(cryptrSecret);

  const creditCardNumber = faker.finance.creditCardNumber();
  const cardHolderName = formatName(employee.fullName);
  const expirationDate = formatExpirationDate();
  const cardCVV = cryptr.encrypt(faker.finance.creditCardCVV());

  const cardData: Card = {
    employeeId: employee.id,
    number: creditCardNumber,
    cardholderName: cardHolderName,
    securityCode: cardCVV,
    expirationDate: expirationDate,
    password: undefined,
    isVirtual: true,
    originalCardId: undefined,
    isBlocked: false,
    type: cardType,
  };

  return await repository.insert(cardData);
}

function formatName(name: string) {
  const names = name.split(' ');
  let formattedName = '';
  if (names.length === 1) {
    formattedName = names[0];
  } else if (names.length === 2) {
    formattedName = `${names[0]} ${names[1]}`;
  } else {
    formattedName = `${names[0]} ${names[1].split('')[0]} ${names[2]}`;
  }

  return formattedName.toUpperCase();
}

function formatExpirationDate() {
  const year = new Date().getUTCFullYear() - 1995;
  const month = new Date().getUTCMonth();
  return `${month}/${year}`;
}

export { newCard };
