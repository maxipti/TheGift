const CONTRACT_ADDRESS = "n1eUZchVPoDqVnewitYrvudooScju5mQoFV"; //3ed4f715a614a1d1d3c459b7983d0546a4436f8350d3c8c2a944a505e545d171

class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay");
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({ value = "0", callArgs = "[]", callFunction, callback }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }

    _call({ value = "0", callArgs = "[]", callFunction, callback }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }
}

class GiftContract extends SmartContractApi {
    createGift(gift, cb) {
        this._call({
            callArgs: JSON.stringify([JSON.stringify(gift)]),
            callFunction: "create",
            value: gift.amount,
            callback: cb
        });
    }

    getByAlias(alias, cb) {
        this._simulateCall({
            callArgs: `["${alias}"]`,
            callFunction: "getByAlias",
            callback: cb
        });;
    }

    getUserGifts(cb) {
        this._simulateCall({
            callFunction: "getUserGifts",
            callback: cb
        });;
    }

    pickup(alias, cb) {
        this._call({
            callArgs: `["${alias}"]`,
            callFunction: "pickup",
            callback: cb
        });;
    }

}
