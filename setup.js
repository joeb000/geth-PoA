function accountExists(obj) {
  var i = eth.accounts.length;
  while (i--) {
    if (eth.accounts[i] === obj) {
      return true;
    }
  }
  return false;
}

//create account with address 0x4f1beb6ba0f3c85ab9779f316137d8abee3db998
if (!accountExists('0x4f1beb6ba0f3c85ab9779f316137d8abee3db998')) {
  personal.importRawKey('dfb37e072856fff1b1b4a3992db74bcdb5793339e7791162007677b311c5ccd5', '');
}

function createNewAccounts() {
  personal.newAccount("");
  personal.newAccount("");
  personal.newAccount("");
}

if (eth.accounts.length < 2) {
  createNewAccounts();
}

var mining_threads = 1

function checkWork() {
  if (txpool.status.pending > 0) {
    if (eth.mining) return;
    console.log("== Pending transactions! Mining...");
    miner.start(mining_threads);
  } else {
    miner.stop();
    console.log("== No transactions! Mining stopped.");
  }
}
eth.filter("latest", function(err, block) {
  checkWork();
});
eth.filter("pending", function(err, block) {
  checkWork();
});



function unlockAll() {
  for (var i = 0; i < eth.accounts.length; i++) {
    console.log("Unlocking Account " + i);
    personal.unlockAccount(eth.accounts[i], "", 999999);
  }
}
unlockAll();

var balances = function() {
  for (var i = 0; i < eth.accounts.length; i++) {
    console.log("eth.accounts[" + i + "]: " + web3.fromWei(eth.getBalance(eth.accounts[i])));
  }
}


function sendTx(fromAddr, toAddr, amount) {
  console.log(eth.sendTransaction({
    from: fromAddr,
    to: toAddr,
    value: web3.toWei(amount)
  }))
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function pad64(n) {
  return pad(n, 64);
}

function distributeEth() {
  for (var i = 0; i < eth.accounts.length; i++) {
    sendTx(eth.accounts[0], eth.accounts[i], 5);
  }
  balances();
}
distributeEth();
