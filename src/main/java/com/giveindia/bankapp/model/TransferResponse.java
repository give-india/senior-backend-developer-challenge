package com.giveindia.bankapp.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class TransferResponse {
    private int newSrcBalance;
    private int totalDestBalance;
    private LocalDateTime timestamp;

    public TransferResponse() {
    }

    public TransferResponse(int newSrcBalance, int totalDestBalance, LocalDateTime timestamp) {
        this.newSrcBalance = newSrcBalance;
        this.totalDestBalance = totalDestBalance;
        this.timestamp = timestamp;
    }

    public int getNewSrcBalance() {
        return newSrcBalance;
    }

    public void setNewSrcBalance(int newSrcBalance) {
        this.newSrcBalance = newSrcBalance;
    }

    public int getTotalDestBalance() {
        return totalDestBalance;
    }

    public void setTotalDestBalance(int totalDestBalance) {
        this.totalDestBalance = totalDestBalance;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
