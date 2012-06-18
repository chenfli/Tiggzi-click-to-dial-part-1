function person(name,tel,pic)
{
this.name=name;
// workaround of tiggzi bug, unable to remove undefined ID mapping
if (tel == "unkown") 
tel = "unknown";
this.tel=tel;
this.pic=pic;
}