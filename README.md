## Backend Developer at Give

# Senior Backend Developer Challenge Application
This Markdown file provides instructions for cloning and running the Senior Backend Developer Challenge application.

## Clone the Repository
To clone the repository, run the following command in your terminal:

```
git clone https://github.com/jangidprashant92/senior-backend-developer-challenge.git
```

## Install Dependencies
After cloning the repository, navigate to the cloned folder:

```
cd senior-backend-developer-challenge
```

Then, install the dependencies by running:

```
yarn install
```
Run the Server
To start the server, run:

```
yarn dev
```
## Accessing the API
1. The transfer API URL is:

    ```
    http://localhost:3005/api/transfer
    ```
    You can send a transfer request using the following data:

    ```
    fromAccountId: 1
    toAccountId: 3
    amount: 20
    ```

2. The get account by user id API URL is:
    ```
    http://localhost:3005/api/getAccountsByUserId
    ```
    You can get user balance by id

    ```
    userId: 1
    ```

3. The create account API URL is:
    ```
    http://localhost:3005/api/addAccount
    ```
    You can create user

    ```
    userId:3
    type:Savings
    balance:5000
    ```

## Dummy Data
The dummy data is stored in the `db` folder.
