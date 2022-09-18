$(document).ready(function(){
	
	$('#submit').click(function(){
        console.log("æ­£åœ¨èŽ·å–tokenï¼Œè€å¿ƒç­‰ä¸‹ï¼")

    var token = document.getElementById('uid').value
    const request = new XMLHttpRequest()
    url = "https://cat-match.easygame2021.com/sheep/v1/game/user_info?uid=" + token + "&t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMzQ3MDEsIm5iZiI6MTY2MzIzMjUwMSwiaWF0IjoxNjYzMjMwNzAxLCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo4ODMyMjkyNSwiZGVidWciOiIiLCJsYW5nIjoiIn0.Nm6lxexjDy4ghV7rSa_QgjSUnx10SqAQMElViUEvDaw"
    request.open('get', url)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const object = JSON.parse(request.response)
                if (object['err_msg'] === "") {
                    const wx_open_id = object['data']['wx_open_id'];
                    request.open('post', "https://cat-match.easygame2021.com/sheep/v1/user/login_tourist")
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    request.onreadystatechange = () => {
                        if (request.readyState === 4) {
                            if (request.status >= 200 && request.status < 300) {
                                const object = JSON.parse(request.response)
                                document.getElementById('token').value = object['data']['token']
                                     console.log("èŽ·å–æˆåŠŸï¼")
                                mdui.snackbar({
                                    message: "èŽ·å–æˆåŠŸ",
                                    position: 'top',
                                })
                            } else {
                                     console.log("æºæœåŠ¡å™¨å“åº”è¶…æ—¶,è¯·é‡è¯•ï¼")
                                mdui.snackbar({
                                    message: "æºæœåŠ¡å™¨å“åº”è¶…æ—¶,è¯·é‡è¯•ï¼",
                                    position: 'top',
                                })
                            }
                        }
                    }
                    request.send('uuid=' + wx_open_id)

                } else {
                    mdui.snackbar({
                        message: object['err_msg'],
                        position: 'top',
                    })
                }

            } else {
                mdui.snackbar({
                    message: "æºæœåŠ¡å™¨å“åº”è¶…æ—¶,è¯·é‡è¯•ï¼",
                    position: 'top',
                })
            }

        }

    }
    request.send()
	});


});


