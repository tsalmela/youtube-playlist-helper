window.videoIdCount=100,window.youtubeRegexPattern=/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/.source,window.fetchVideo=async t=>{const e=await fetch(`https://www.youtube.com/get_video_info?video_id=${t}`,{headers:{origin:"https://www.youtube.com"}}),i=await e.text(),o=new URLSearchParams(i).get("player_response"),{videoDetails:a}=JSON.parse(o);return{id:window.videoIdCount++,videoId:t,url:"https://www.youtube.com/watch?v="+t,title:a.title,channel:a.author,thumbnailUrl:"https://i.ytimg.com/vi/"+t+"/default.jpg"}},window.parseYoutubeId=t=>{const e=RegExp(window.youtubeRegexPattern,"i").exec(t);return e&&e.length>1?e[1]:null},window.generatePlaylist=async t=>{const e=await window.generatePlaylistId(),i=new Date;return{id:e,title:i.toLocaleString(),videos:t||[],timestamp:i.getTime()}},window.openPlaylistEditor=t=>{const e=location.hash.length>0?location.hash.substring(1):"/";history.pushState({playlist:t,previousPage:e},"","#/editor"),window.dispatchEvent(new Event("hashchange"))};window.openPlaylist=async t=>{const e=[...t],i=new Array(Math.ceil(e.length/50)).fill().map((t=>e.splice(0,50))),o=await window.getSettings();await Promise.all(i.map((async t=>{var e="https://www.youtube.com/watch_videos?video_ids="+t.join(",");if(o.openPlaylistPage){const t=await(await fetch(e)).text(),i=/og:video:url[^>]+\?list=([^"']+)/.exec(t);i&&i.length>1?e="https://www.youtube.com/playlist?list="+i[1]:alert("Unable to retrieve playlist id. Directly playing videos instead...")}if("undefined"!=typeof browser)return browser.tabs.create({url:e});window.open(e,"_blank")})))};
