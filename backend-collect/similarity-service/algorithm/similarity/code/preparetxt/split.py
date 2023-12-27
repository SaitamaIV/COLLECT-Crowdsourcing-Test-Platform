# -*- coding:UTF-8 -*-
import os

import jieba
import io
import jieba.analyse

current_path = os.path.dirname(__file__)
os.chdir(current_path)
# 将句子分词用" "连接
def text_to_wordlist(text):
    words = list(jieba.cut(text.strip(), cut_all=False))
    return (" ".join(words))
# 测试分词之后的结果  没问题
# strlines = eachLine('/home/fangqin/yf/tfidf/chulitxt/413所有1去符号.txt')
# for line in strlines:
#     testlines = text_to_wordlist(line)
#     print (testlines)

# 将txt文本分词之后再存进TXT文件里

def eachLine(fileName, fileName2):
    with io.open(fileName, "r", encoding='utf-8') as f:
        lines = f.readlines()

    with io.open(fileName2, "w", encoding='utf-8') as f_w:
        for line in lines:
            strline = line.strip()
            f_w.write(text_to_wordlist(strline)+'\n')


if __name__ == '__main__':
    #输入的需要分词的文件
    fileName = '../../data/tmp2/nosign.txt'
    #输出的已经分词的文件
    fileName2 = '../../data/tmp2/split.txt'
    eachLine(fileName,fileName2)
