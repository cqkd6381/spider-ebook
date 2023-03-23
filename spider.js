console.log('我是嵌入的js');

const downloads = [];

setTimeout(() => {
  try {
    let title = document.querySelector("#main-content > div.content > div.index-module_special-edu-detail_aH1Nr > div > div > div.index-module_header_tG-zz > h3")
    console.log(title.innerHTML)
    if (title) {
      title = title.innerHTML
      let titleExist = window.localStorage.getItem(`title-${title}`)
      if (!titleExist) {
        window.localStorage.setItem(`title-${title}`, 1)
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
  const selector = ".document-context"
  const ele = document.querySelector(selector)
  if (ele) {
    // 刚进入时下载第一页
    getRenderElement(ele)
    const interval = setInterval(() => {
      getRenderElement(ele)
      const clientHeight = ele.clientHeight; // ele可见区域高
      const scrollTop = ele.scrollTop; // ele滚动条的垂直位置
      const scrollHeight = ele.scrollHeight // ele内容高度，包括滚动条
      const hasScrolledToBottom = clientHeight + scrollTop === scrollHeight // ele滚动条是否滚动到底部
      console.log(clientHeight, scrollTop, scrollHeight, hasScrolledToBottom)
      // if (hasScrolledToBottom || scrollTop > 5000) {
      if (hasScrolledToBottom) {
        clearInterval(interval)
      } else {
        ele.scrollTo({
          top: scrollTop + (773 + 20) / 3, // 每次向下滚动1/2页（包括外边距）
          behavior: "smooth",
        });
      }
    }, 750); // 每750毫秒滚动一次
  } else {
    console.log(`选择器（${selector}）选取的元素不存在`)
  }
}, 5000);

async function download (canvas, filename) {
  // 通过 API 获取目标 canvas 元素
  // const canvas = selector.querySelector("canvas");

  // 创建一个 a 标签，并设置 href 和 download 属性
  const el = document.createElement('a');
  // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
  el.href = canvas.toDataURL("image/jpeg", 1.0);
  el.download = filename;

  // 创建一个点击事件并对 a 标签进行触发
  const event = new MouseEvent('click');
  el.dispatchEvent(event);
}
// download("#page-7 > canvas")

/**
 * 获取已经渲染的页
 */
function getRenderElement (ele) {
  const nodeList = ele.querySelectorAll('[data-rendered="rendered"]')
  console.log(nodeList)
  nodeList.forEach(node => {
    console.log(node)
    const id = node.getAttribute('id')
    const hasDownloaded = downloads.findIndex(item => item === id)
    const canvas = node.querySelector("canvas");
    if (hasDownloaded === -1 && canvas && canvas.getAttribute('height') != 0) {
      // 延迟100ms，确保canvas渲染完成
      setTimeout(() => {
        download(canvas, id + '.jpg')
      }, 100);
      downloads.push(id)
    }
  });
}

/**
 * 手动下载
 * 仅需输入download2(页数)
 */
function download2 (id) {
  const selector = `#page-${id} > canvas`
  const filename = `page-${id}.jpg`
  // 通过 API 获取目标 canvas 元素
  const canvas = document.querySelector(selector);

  // 创建一个 a 标签，并设置 href 和 download 属性
  const el = document.createElement('a');
  // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
  el.href = canvas.toDataURL("image/jpeg", 1.0);
  el.download = filename;

  // 创建一个点击事件并对 a 标签进行触发
  const event = new MouseEvent('click');
  el.dispatchEvent(event);
}