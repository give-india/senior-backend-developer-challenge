class Status(object):
    SUCCESS = 'SUCCESS'
    INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE'
    SERVER_ERROR = 'SERVER_ERROR'

    CHOICES = (
        (SUCCESS, 'Success'),
        (INSUFFICIENT_BALANCE, 'Insufficient Balance'),
        (SERVER_ERROR, 'Server Failure'),
    )
