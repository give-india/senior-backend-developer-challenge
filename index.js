import { createServer } from 'http';
import account from './accounts';

const validateTransaction = (info) => {
    const invalidRequest = (message) => {
        return {
            code: 'InvalidRequest',
            message
        }
    }
    if (!info.pin) {
        throw invalidRequest('security pin is manotary');
    }
    
    if (!info.fromAccount) {
        throw invalidRequest('fromAccount is manotary');
    }
    if (!info.toAccount) {
        throw invalidRequest('toAccount is manotary');
    }

    if (!info.amount) {
        throw invalidRequest('amount is manotary');
    }
};

const transferMoney = (info) => {
    validateTransaction(info);
    const { fromAccount, toAccount, amount, pin } = info;
    const fAccountInfo = account.getAccount(fromAccount);
    const toAccountInfo = account.getAccount(toAccount);
    if (!fAccountInfo || !toAccountInfo) {
        throw { code: 'AccountDoesntExists', message: 'Either source account invalid or does not exist' };
    }

    if (fAccountInfo.pin !== pin) {
        throw { code: 'UnauthorizedAccess', message: 'Premission Denied!' };
    }

    if (fAccountInfo.userId === toAccountInfo.userId) {
        throw {code: 'AccountsBelongsToOneUser', message: 'Source and target account should not belongs to same user.'}
    }

    const fromAccountAfterDebit = account.debitFromAccount(fromAccount, +amount);
    console.log('Account debited ::', fromAccountAfterDebit)
    let result = {
        fromAccount,
        toAccount,
        fromAccountBalance: fromAccountAfterDebit.balance,
        transactAt: Date.now()
    };
    try {
        const toAccountAfterCredit = account.creditIntoAccount(toAccount, +amount);
        console.log('Account credited ::', toAccountAfterCredit)
        return { ...result, toAccountBalance: toAccountAfterCredit.balance }
    } catch (err) {
        //rollback
        account.creditIntoAccount(fromAccount, amount);
        throw err;
    }
}

createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/send-money') {
        res.setHeader('Content-Type', 'application/json');
        var body = '';
        req.on('data', function (data) {
            body += data;
            if(body.length > 1e6) {
                body = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        req.on('end', function() {
            const params = JSON.parse(body);
            try {
                const transactionData = transferMoney(params);
                res.end(JSON.stringify(transactionData));
            } catch (err) {
                console.error(err);
                res.statusCode = err.code === 'UnauthorizedAccess' ? 403 : 400;
                res.end(JSON.stringify(err));
            }
        });
    } else {
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end(`
            Hello Giveindia!<br><br>

            My self Krishan Kumar Yadav from Jaipur, Rajasthan. I am having 7 years of experience<br>
            as Backend Engineer. Please find more details below-<br><br>
            <a target="_blank" href="https://drive.google.com/file/d/1yK2qFoSX6qm5-OUuDmhahulClIuOhPGA/view?usp=sharing">Resume</a><br><br> 
            <a target="_blank" href="www.linkedin.com/in/krishan-yadav-krrish-yadav-6290b772">Resume</a><br><br> 
            <a target="_blank" href="https://github.com/Krrish92">Git repo</a><br><br> 
            <a target="_blank" href="https://stackoverflow.com/users/5698039/krrish-yadav">Stackoverflow</a><br><br>

            Thanks :) 
        `)
    }

}).listen(8000, () => 
console.info('Server is running on 8000 port.'));