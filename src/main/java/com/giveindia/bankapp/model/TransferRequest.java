package com.giveindia.bankapp.model;

import javax.validation.constraints.NotNull;

public class TransferRequest {
    @NotNull
    int fromAccountId;

    @NotNull
    int toAccountId;

    @NotNull
    int amount;

    public TransferRequest() {
    }

    public int getFromAccountId() {
        return fromAccountId;
    }

    public void setFromAccountId(int fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public int getToAccountId() {
        return toAccountId;
    }

    public void setToAccountId(int toAccountId) {
        this.toAccountId = toAccountId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
