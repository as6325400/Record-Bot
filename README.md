## 介紹
當助教簡單拿來紀錄加分的人而已

## 指令

## add

會自動計算要加在哪一週，只有上課日才有辦法使用這個指令

```
& add [學號]
```
直接在當週紀錄此人有加分

```
& add -o [學號]
```
紀錄當週有來 office hour

## show

### date
```
& show date
```
顯示每個日期對應的週次

### week
```
& show -t [週次]
```
顯示當週有加分到的人

```
& show -to [週次]
```
顯示當週有來 office hour 的人

### id
```
& show -s [學號]
```
顯示該學生加分過幾次

## remove

皆僅限當天使用

### 單一學生刪除
```
& remove -r [學號]
```
刪除當週有成功加分的人

```
& remove -p [學號]
```
刪除當週有來 office hour 的人


### 全部學生刪除
```
& remove -r all -f
```
