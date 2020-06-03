const OpenSource = artifacts.require("OpenSource");

var accounts;
var owner;

contract('OpenSource', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Community', async() => {
    let tokenId = 1;
    let instance = await OpenSource.deployed();
    await instance.createCommunity('Awesome Community!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToCommunityInfo.call(tokenId), 'Awesome Community!')
});

it('lets user1 put up their community for sale', async() => {
    let instance = await OpenSource.deployed();
    let user1 = accounts[1];
    let communityId = 2;
    let communityPrice = web3.utils.toWei(".01", "ether");
    await instance.createCommunity('awesome community', communityId, {from: user1});
    await instance.putCommunityUpForSale(communityId, communityPrice, {from: user1});
    assert.equal(await instance.communitysForSale.call(communityId), communityPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await OpenSource.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let communityId = 3;
    let communityPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createCommunity('awesome community', communityId, {from: user1});
    await instance.putCommunityUpForSale(communityId, communityPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyCommunity(communityId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(communityPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a community, if it is put up for sale', async() => {
    let instance = await OpenSource.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let communityId = 4;
    let communityPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createCommunity('awesome community', communityId, {from: user1});
    await instance.putCommunityUpForSale(communityId, communityPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyCommunity(communityId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(communityId), user2);
});

it('lets user2 buy a community and decreases its balance in ether', async() => {
    let instance = await OpenSource.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let communityId = 5;
    let communityPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createCommunity('awesome community', communityId, {from: user1});
    await instance.putCommunityUpForSale(communityId, communityPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyCommunity(communityId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysCommunity = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysCommunity);
    assert.equal(value, communityPrice);
});
