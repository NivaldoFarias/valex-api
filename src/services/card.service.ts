import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';

import * as repository from '../repositories/card.repository';

import TransactionTypes from '../types/transaction.type';
import Employee from '../interfaces/employee.interface';
import Card from '../interfaces/card.interface';

import './../config/setup';

const cryptrSecret = process.env.CRYPTR_SECRET || 'secret';
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) ?? 10;
const CRYPTR = new Cryptr(cryptrSecret);

async function newCard(employee: Employee, cardType: TransactionTypes) {
  const creditCardNumber = faker.finance.creditCardNumber();
  const cardHolderName = formatName(employee.fullName);
  const expirationDate = formatExpirationDate();
  const cardCVV = faker.finance.creditCardCVV();
  const securityCode = CRYPTR.encrypt(cardCVV);

  const cardData: Card = {
    employeeId: employee.id,
    number: creditCardNumber,
    cardholderName: cardHolderName,
    securityCode: securityCode,
    expirationDate: expirationDate,
    password: undefined,
    isVirtual: true,
    originalCardId: undefined,
    isBlocked: false,
    type: cardType,
  };

  await repository.insert(cardData);
  return cardCVV;
}

function isCardAlreadyActive(card: Card) {
  return !!card.password;
}

function validSecurityCode(card: Card, securityCode: string) {
  const decrypted = CRYPTR.decrypt(card.securityCode);
  return decrypted === securityCode;
}

function createBCryptPassword(card: Card, password: string) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const cryptPass = bcrypt.hashSync(password, salt);
  return {
    employeeId: card.employeeId,
    number: card.number,
    cardholderName: card.cardholderName,
    securityCode: card.securityCode,
    expirationDate: card.expirationDate,
    password: cryptPass,
    isVirtual: card.isVirtual,
    originalCardId: card.originalCardId,
    isBlocked: card.isBlocked,
    type: card.type,
  };
}

function formatName(name: string) {
  const regex = /^(d[a,e,o,i])$/;
  const names = name.split(' ');
  let formattedName = '';

  if (names.length === 1) {
    formattedName = names[0];
  } else if (names.length === 2) {
    formattedName = `${names[0]} ${names[1]}`;
  } else {
    const half = Math.floor(names.length / 2);
    const firstName = names[0];
    const lastName = names[names.length - 1];
    const middleName = regex.test(names[half])
      ? names[half + 1] === lastName
        ? names[half - 1]
        : names[half + 1]
      : names[half];

    formattedName = `${firstName} ${middleName[0]} ${lastName}`;
  }

  return formattedName.toUpperCase();
}

function formatExpirationDate() {
  const year = new Date().getUTCFullYear() - 1995;
  const month = new Date().getUTCMonth();
  return `${month}/${year}`;
}

export {
  newCard,
  isCardAlreadyActive,
  validSecurityCode,
  createBCryptPassword,
};
