const task = document.getElementById('task');
const result = document.getElementById('result');
const btn = document.getElementById("btn");

task.innerHTML = ``

function doMagic () {
    let resultArray = [];

    const regexExpIpAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const regexUrl = /^http.*/;
    const regexTcpUdp = /^(TCP|UDP).*/;

    let splitted = task.value.trim().split(/\r?\n/);
    splitted = splitted.filter(Boolean);
    splitted = splitted.map((value) => {
        return value.trim();
    })
    console.log(splitted);

    let ipAddresses = [];
    let protocols = [];
    let urls = [];
    splitted.forEach((value, index, array) => {
        const potentialIpAddress = value.trim().split(' ')[0];
        if (regexExpIpAddress.test(potentialIpAddress)) {
            ipAddresses.push(potentialIpAddress);
            protocols.push(value.replace(potentialIpAddress + ' ', ''));
        } else if (regexUrl.test(value.trim())) {
            urls.push(value.trim());
        }
    });
    console.log(ipAddresses);
    console.log(protocols);
    console.log(urls);
    protocols = protocols.map((value, index, array) => {
        return value.slice(1, -1);
    });
    protocols = protocols.map((value, index, array) => {
        return value.trim().split(', ');
    });
    protocols = protocols.map((item) => {
        return item.map((value, index, array) => {
            return value.trim().split('/');
        });
    });
    protocols = protocols.map((item, index, array) => {
        return item.map((value) => {
            let a = [];
            a.push(value[1].toUpperCase());
            a.push(ipAddresses[index]);
            a.push(value[0]);
            return a[0] + ' ' + a[1] + ':' + a[2];
        });
    });
    urls.forEach((url) => {
        resultArray.push('GET ' + url);
    });
    protocols.forEach((protocolMap) => {
        protocolMap.forEach((value, index, array) => {
            if (regexTcpUdp.test(value)) {
                resultArray.push(value);
            }
        })
    })

    result.innerHTML = resultArray.join("\r\n")
}

btn.addEventListener('click', event => {
    doMagic();
});
