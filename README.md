## Backend Developer at Give

### Objective
Write a REST-based API that enables the transfer of money from one bank account to another.

Account types are ‘Savings’, ‘Current’, and ‘BasicSavings’. A single user can have multiple such accounts. The following rules apply:
* Transfer between accounts belonging to the same user is not allowed.
* The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000
* Source account should have the required amount for the transaction to succeed

The API spec follows: (All amounts in the API are in paisa)

**Input (JSON)**
* fromAccountId
* toAccountId
* amount

**Output (JSON)**
success case:
* newSrcBalance: The balance in the source account after the transfer
* totalDestBalance: The total balance in all accounts of destination user combined
* transferedAt: timestamp

failure case:
* errorCode
* errorMessage

**Any language, framework, and database would do. Our preference would be Node.js since it is most commonly used across our tech stacks, but it is not mandatory**

### Deliverables
- Create a fork of this repository
- Include instructions on how to set it up and run in the README.md
- Please provide instructions on how to run it in the README.md. Include some sample users/accounts data to test for various scenarios. Around 10 or so sample accounts should suffice to cover the scenarios.
- Add your resume and other profile / project links
- Submit a pull request (PR)


## Installation Instruction:
- Prerequisites
  - Install Python3 to your system.
  - Install Virtual environment and activate the Virtual environment.
- Clone the repository to a directory and move along the root(manage_bank) folder.
- Install Requirements:
  - `pip3 install -r requirements` 


## Executing Project:
#### With Existing Database: 
- Run `python3 manage.py runserver` to start the project and head to the URL provided in the console.

#### With New Database: 
- Run `python3 manage.py makemigrations` to make the migrations if any.
- Run `python3 manage.py migrate` to migrate and create database and tables as per the defined models.
- Run `python3 manage.py runserver` to start the project and head to the URL provided in the console.

## Accessing the data:
- Django provides the functionality of admin panel where we can manage the data tables and data we created.

The admin panel can be accessed over http://127.0.0.1:8000/admin with the user_id/password as admin/admin@1234.
- Under this panel there will be tables as:
  - User: Table containing user details.
  - AccountType: Table to create various types of bank account types. 3 entries are already present Basic Savings, Savings and Current.
  - UserAccount: This table contains details about the user having the bank accounts. Each account has a unique account_id.
  - Transaction: This table contains the data about the transaction requests made by the user.

The Postman collection can be referred over the link: https://www.getpostman.com/collections/f24e4c56c828fe5a399a

