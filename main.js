LINK = "https://raw.githubusercontent.com/averroem/clickext/master/member.json"
fetch(LINK)
    .then(res => res.json())
    .then(data => memberInfo(data))


async function memberInfo(datas){
  const memberlist = Object.values(datas.member)
  memberlist.forEach((element,k) => {
    console.log(element,k)
  });
}