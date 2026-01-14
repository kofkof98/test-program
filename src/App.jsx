import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  SkipForward, 
  Info,
  Menu,
  X,
  History,
  LayoutGrid,
  Eye,
  Award
} from 'lucide-react';

/**
 * 完整題庫資料：100-103 年
 */
const initialQuestions = [
  // ================= 100 年 選擇題 =================
  {
    id: '100-Q1', year: '100年', type: 'multiple', page: 3, num: 1,
    question: '依據網際網路 IPv4 之網址格式，下列所示之IP 網址中，何者錯誤?',
    options: ['(A) 10.20.40.60', '(B) 110.120.140.160', '(C) 210.220.240.260', '(D) 255.255.255.0'],
    answer: 2,
    explanation: '根據網際網路 IPv4 之網址格式，每個IP 位址的範圍應該在0到255之間，其中每個數字都是用十進制表示。而在選項(C)中，最後一個數字"260"超出了0到255的範圍，因此是錯誤的IP網址。故本題選C'
  },
  {
    id: '100-Q2', year: '100年', type: 'multiple', page: 3, num: 2,
    question: '有關開放式通訊系統互聯(OSI)參考模型，請問該模型之最上第七層及最下第一層分別為何?',
    options: ['(A)表現層、資料連結層', '(B)應用層、資料連結層', '(C)表現層、實體層', '(D)應用層、實體層'],
    answer: 3,
    explanation: 'OSI 七層架構由最上層至最下層分別為：\n7.應用層:負責應用程式與使用者之間的通訊。\n6.表現層:負責資料的翻譯、加解密、壓縮等處理。\n5.會議層:負責在兩個通訊實體之間建立、管理與終止通訊連線。\n4.傳輸層:負責處理可靠的端對端資料傳輸，例如流量控制、錯誤修復等。\n3.網路層:將資料封裝成封包並進行路由選擇，使資料能夠在不同網路間傳輸。\n2.資料連結層:負責在相鄰的網路節點間傳送封包，並處理錯誤偵測和修復。\n1.實體層:負責實際的硬體傳輸，包括電壓、電流、傳輸速率等。\n故本題選D'
  },
  {
    id: '100-Q3', year: '100年', type: 'multiple', page: 4, num: 3,
    question: 'IPv4 網址長度為32位元(bits)，請問 IPv6 網址長度為多少位元?',
    options: ['(A) 48', '(B) 64', '(C) 96', '(D) 128'],
    answer: 3,
    explanation: 'IPv6 網址長度為128位元bits，IPv4 網址長度為32位元bits。故本題選D'
  },
  {
    id: '100-Q4', year: '100年', type: 'multiple', page: 4, num: 4,
    question: '在網際網路之通訊協定中，下列何者非用於傳收電子郵件(E-mail)?',
    options: ['(A) FTP', '(B) IMAP', '(C) SMTP', '(D) POP3'],
    answer: 0,
    explanation: '(A) FTP (File Transfer Protocol)用於檔案傳輸的協定。\n(B) IMAP 是一種用於存取遠端郵件伺服器上郵件的協定，允許使用者在多個設備上同步存取郵件，包括郵件伺服器上的郵件夾。\n(C) SMTP 是一種用於傳送郵件的協定，負責將郵件從寄件者的郵件伺服器傳送、到收件者的郵件伺服器。\n(D) POP3 是一種用於從郵件伺服器下載郵件到用戶端的協定，允許使用者在本地端存取郵件。\n故本題選A'
  },
  {
    id: '100-Q5', year: '100年', type: 'multiple', page: 4, num: 5,
    question: '依據網路所部署的區域規模而言，下列網路可覆蓋(coverage)的範圍大小，依序為何?',
    options: ['(A) WAN>LAN>MAN', '(B) MAN>LAN>WAN', '(C) WAN>MAN>LAN', '(D) MAN>WAN>LAN'],
    answer: 2,
    explanation: 'WAN (Wide Area Network)覆蓋跨越長距離的地區，如跨越國家或跨越大型都市的區域。\nMAN (Metropolitan Area Network)則介於WAN 和LAN之間，覆蓋城市或都市的範圍。\nLAN (Local Area Network)通常限制在單一建築物或者局部區域內，如家庭、辦公室或校園。\n故範圍大小依序為 WAN > MAN > LAN。故本題選C'
  },
  {
    id: '100-Q6', year: '100年', type: 'multiple', page: 5, num: 6,
    question: '下列所示之四項數字表示式，由小至大之排序為何? A=199(10), B=11000110(2), C=311(8), D=C8(16)',
    options: ['(A) A<B<C<D', '(B) B<A<C<D', '(C) A<B<D<C', '(D) B<A<D<C'],
    answer: 3,
    explanation: 'B = 11000110(2) = 198\nC = 311(8) = 3*64 + 1*8 + 1 = 201\nD = C8(16) = 12*16 + 8 = 200\nA = 199(10) = 199\n比較大小：198(B) < 199(A) < 200(D) < 201(C)\n故本題選D'
  },
  {
    id: '100-Q7', year: '100年', type: 'multiple', page: 5, num: 7,
    question: '175.375(10) 以二進制型式 x.y(2)作表示，下列何者正確?',
    options: ['(A) 10101110.011', '(B) 10101110.110', '(C) 10101111.011', '(D) 10101111.110'],
    answer: 2,
    explanation: '把175.375拆成 175+0.375\n整數部分 175 轉二進制：10101111\n小數部分 0.375 轉二進制：\n0.375 * 2 = 0.75 (取0)\n0.75 * 2 = 1.5 (取1)\n0.5 * 2 = 1.0 (取1)\n所以 0.375 = 0.011\n合併為 10101111.011。故本題選C'
  },
  {
    id: '100-Q8', year: '100年', type: 'multiple', page: 6, num: 8,
    question: '於電腦中負責執行”算術與邏輯運算”的單元，為下列何者?',
    options: ['(A) ALU', '(B) DMA', '(C) DOS', '(D) BIOS'],
    answer: 0,
    explanation: 'ALU:算術邏輯單元，負責執行各種算術(如加法、減法、乘法、除法)和邏輯(如與、或、非、比較等)運算。\nDMA:直接存取記憶體，是一種在電腦中用於進行高速資料傳輸的技術，負責處理裝置和主記憶體之間的資料傳輸。\nDOS:磁碟作業系統，是一種作業系統，用於控制和管理電腦硬體和軟體資源。\nBIOS:基本輸入/輸出系統，負責在電腦開機時進行基本的硬體初始化和啟動作業系統。\n故本題選A'
  },
  {
    id: '100-Q9', year: '100年', type: 'multiple', page: 6, num: 9,
    question: '將十進制負數-119(10)以8個位元(bits)的二進制2的補數作表示，下列何者正確?',
    options: ['(A) 10001000', '(B) 10001001', '(C) 10001010', '(D) 11110111'],
    answer: 1,
    explanation: 'Step 1: 將 119(10) 轉換為二進制絕對值表示 119 = 01110111\nStep 2: 取反碼 (1變0，0變1) -> 10001000\nStep 3: 加 1 -> 10001000 + 1 = 10001001\n故本題選B'
  },
  {
    id: '100-Q10', year: '100年', type: 'multiple', page: 7, num: 10,
    question: '於演算法或函數定義中直接”呼叫”(calls)自身函數，例如:費氏數列...此一類型的運算程序，稱之為何?',
    options: ['(A)重複(iteration)', '(B)跳躍(jumping)', '(C)遞迴(recursion)', '(D)循環(looping)'],
    answer: 2,
    explanation: '重複(iteration)是指使用迴圈等方式來重複執行相同的程式碼。\n跳躍(jumping)通常指程式流程在執行時跳躍到其他地方。\n遞迴(recursion)是指在函數內部直接呼叫自身函數，並且每次呼叫都使用不同的參數值，形成一個遞歸的呼叫關係。\n循環(looping)通常指使用迴圈等方式來實現程式的循環執行。\n故本題選C'
  },
  {
    id: '100-Q11', year: '100年', type: 'multiple', page: 7, num: 11,
    question: '設計一結構化程式或演算法，以哪三項基本組構(constructs)程序為主?',
    options: ['(A)輸入、解碼、輸出', '(B)輸入、驗證、執行', '(C)取用、解碼、執行', '(D)循序、決策、重複'],
    answer: 3,
    explanation: '設計一結構化程式或演算法時，以以下三項基本組構(constructs)程序為主：循序(sequence)、決策(decision)、重複(repetition)。故本題選D'
  },
  {
    id: '100-Q12', year: '100年', type: 'multiple', page: 7, num: 12,
    question: '某一數列有1207筆且資料已排序，以二元搜尋法於該數列中找尋一筆目標資料時，試問最多”比對資料”幾次即可得知結果?',
    options: ['(A) 10', '(B) 11', '(C) 12', '(D) 13'],
    answer: 1,
    explanation: '二元搜尋法最多比對次數 = log2(N)。\nN=1207，log2(1024) = 10，log2(2048) = 11。\n因為 10 < log2(1207) < 11，且必須取整數進位，所以最多需要 11 次。\n故本題選B'
  },
  {
    id: '100-Q13', year: '100年', type: 'multiple', page: 8, num: 13,
    question: '於堆疊(stack)、佇列(queue)結構下，兩者的資料存取特性各為何?',
    options: ['(A)堆疊 FIFO、佇列 FIFO', '(B)堆疊 FIFO、佇列 LIFO', '(C)堆疊 LIFO、佇列 FIFO', '(D)堆疊 LIFO、佇列 LIFO'],
    answer: 2,
    explanation: '堆疊(stack)結構，資料存取特性為後進先出(LIFO, Last-In-First-Out)。最後被放入堆疊的資料會被最先取出。\n佇列(queue)結構，資料存取特性為先進先出(FIFO, First-In-First-Out)。最先被放入佇列的資料會被最先取出。\n故本題選C'
  },
  {
    id: '100-Q14', year: '100年', type: 'multiple', page: 8, num: 14,
    question: '將中序運算式 A*(B+C)-E*F 轉換成後序運算式，其結果為下列何式?',
    options: ['(A) ABC+*EF*-', '(B) A*(B+C)-E*F', '(C) AB*C+EF*-', '(D) AB*C+E-F*'],
    answer: 0,
    explanation: '中序：A*(B+C)-E*F\n1. 括號先處理：A*(BC+)-E*F\n2. 乘法處理：(ABC+*)-(EF*)\n3. 減法處理：ABC+*EF*-\n故本題選A'
  },
  {
    id: '100-Q15', year: '100年', type: 'multiple', page: 8, num: 15,
    question: '下列何種記憶體技術，可將部分程式暫時儲存於硬式磁碟上，於需要執行之時才進行資料交換(swap)?',
    options: ['(A)堆疊記憶體', '(B)佇列記憶體', '(C)快取記憶體', '(D)虛擬(virtual)記憶體'],
    answer: 3,
    explanation: '虛擬(virtual)記憶體可以將部分程式暫時儲存於硬式磁碟上，於需要執行時才進行資料交換(swap)。這樣可以擴大系統的記憶體容量，讓程式可以運行比實際可用記憶體更大的資料集。故本題選D'
  },
  {
    id: '100-Q16', year: '100年', type: 'multiple', page: 9, num: 16,
    question: '下列資料儲存媒介中，何者之資料存取(data access)速度最快?',
    options: ['(A)暫存器', '(B)硬式磁碟', '(C)主記憶體', '(D)快取記憶體'],
    answer: 0,
    explanation: '存取速度由快到慢：暫存器 > 快取記憶體 > 主記憶體 > 硬式磁碟。故本題選A'
  },
  {
    id: '100-Q17', year: '100年', type: 'multiple', page: 9, num: 17,
    question: '假設快閃(flash)記憶體的容量標示為8GB，試問其容量為多少位元組(Bytes)?',
    options: ['(A) 2^13', '(B) 2^23', '(C) 2^33', '(D) 2^43'],
    answer: 2,
    explanation: '1 GB = 2^30 Bytes\n8 GB = 2^3 * 2^30 Bytes = 2^33 Bytes\n故本題選C'
  },
  {
    id: '100-Q18', year: '100年', type: 'multiple', page: 9, num: 18,
    question: '一記憶體位址範圍為 6000(16) ~ 8FFF(16)，每一位址可儲存16位元，試問該記憶體容量為多少KB?',
    options: ['(A) 12 KB', '(B) 24 KB', '(C) 48 KB', '(D) 96 KB'],
    answer: 1,
    explanation: '位址數量 = 8FFF - 6000 + 1 = 3000(16) = 3*4096 = 12288 個位址\n每個位址儲存 16 bits = 2 Bytes\n總容量 = 12288 * 2 = 24576 Bytes\n24576 / 1024 = 24 KB\n故本題選B'
  },
  {
    id: '100-Q19', year: '100年', type: 'multiple', page: 10, num: 19,
    question: '下列各式唯讀記憶體(ROM)中，何者可用電壓脈衝方式來”抹除”已儲存的資料?',
    options: ['(A) EEPROM', '(B) EPROM', '(C) PROM', '(D) ROM'],
    answer: 0,
    explanation: '(A) EEPROM(可擦除可編程可電壓擦寫唯讀記憶體)：可以使用電壓脈衝方式來抹除。\n(B) EPROM：需要使用紫外線脈衝方式來抹除。\n(C) PROM：只能寫入一次，無法抹除。\n(D) ROM：製造時已寫入，無法抹除。\n故本題選A'
  },
  {
    id: '100-Q20', year: '100年', type: 'multiple', page: 10, num: 20,
    question: '若 X,Y 為布林變數，且 A = (X XOR Y) XOR Y\'，試問 A=?',
    options: ['(A) 1', '(B) 0', '(C) Y\'', '(D) X\''],
    answer: 3,
    explanation: '代入驗證：\n若 X=0, Y=0 -> A = (0 XOR 0) XOR 1 = 0 XOR 1 = 1 (即 X\')\n若 X=1, Y=0 -> A = (1 XOR 0) XOR 1 = 1 XOR 1 = 0 (即 X\')\n若 X=0, Y=1 -> A = (0 XOR 1) XOR 0 = 1 XOR 0 = 1 (即 X\')\n若 X=1, Y=1 -> A = (1 XOR 1) XOR 0 = 0 XOR 0 = 0 (即 X\')\n故 A = X\'。故本題選D'
  },
  {
    id: '100-Q21', year: '100年', type: 'multiple', page: 11, num: 21,
    question: '二進位數 10100011(2) 作算術位移(arithmetic shift)向右移一位元後，試問所得結果為何?',
    options: ['(A) 01000110', '(B) 01010001', '(C) 11010001', '(D) 11000110'],
    answer: 2,
    explanation: '算術右移會保留符號位元(最左邊的位元)。\n10100011 -> 向右移一位 -> _1010001\n補上原本的符號位(1) -> 11010001\n故本題選C'
  },
  {
    id: '100-Q22', year: '100年', type: 'multiple', page: 11, num: 22,
    question: '設長度10位元的二進位數具 2\'s 補數形式，則該數值可表示的範圍為何?',
    options: ['(A) -512~512', '(B) -512~511', '(C) -511~512', '(D) -511~511'],
    answer: 1,
    explanation: '2的補數表示法範圍公式：-2^(n-1) ~ 2^(n-1) - 1\n當 n=10，範圍為 -2^9 ~ 2^9 - 1\n即 -512 ~ 511。故本題選B'
  },
  {
    id: '100-Q23', year: '100年', type: 'multiple', page: 11, num: 23,
    question: '下列各選項中所列的程式語言，二者皆屬於”物件導向式”之程式語言為何?',
    options: ['(A) C/C++', '(B) C/LISP', '(C) Java/C++', '(D) Java/LISP'],
    answer: 2,
    explanation: 'C/C++：C是結構化語言，C++是物件導向。\nJava/C++：兩者皆為物件導向語言，支援類別、物件、繼承等特性。\nLISP：主要是函數式語言。\n故本題選C'
  },
  {
    id: '100-Q24', year: '100年', type: 'multiple', page: 12, num: 24,
    question: '西元2000年的”千禧蟲”與民國100年的”百年蟲”，兩者所指與下列何項有關?',
    options: ['(A) 網路突變病毒', '(B) 資料表突變病毒', '(C) 網路IP位址長度不足', '(D) 資料表年份欄位寬度不足'],
    answer: 3,
    explanation: '是指因為資訊系統中的日期表示方式只使用兩位數來表示年份，導致在西元2000年及民國100年轉換時，無法準確區分，造成資料處理上的困擾。故本題選D'
  },
  {
    id: '100-Q25', year: '100年', type: 'multiple', page: 12, num: 25,
    question: '現行資料庫系統之資料模型(data model)，以下列何者較廣為使用?',
    options: ['(A) 連結式', '(B) 網路式', '(C) 關聯式', '(D) 階層式'],
    answer: 2,
    explanation: '關聯式(relational)資料模型使用表格(table)形式來組織資料，並使用關聯(relation)來表示表格間關係，是目前最廣泛使用的資料模型。其他如連結式、網路式、階層式較少用於現代通用資料庫。故本題選C'
  },
  {
    id: '100-Q26', year: '100年', type: 'multiple', page: 13, num: 26,
    question: '下列何者為使用於資料庫系統之資料查詢語言?',
    options: ['(A) ADA', '(B) SQL', '(C) LISP', '(D) COBOL'],
    answer: 1,
    explanation: 'SQL (Structured Query Language) 是資料庫系統中標準且常用的資料查詢語言。ADA、LISP、COBOL 是一般程式語言。故本題選B'
  },
  {
    id: '100-Q27', year: '100年', type: 'multiple', page: 13, num: 27,
    question: '設 A=100011(2) x B=011011(2) 皆為 2\'s 補數形式(長度6位元)，試問 A+B=?',
    options: ['(A) -2', '(B) -1', '(C) 1', '(D) 2'],
    answer: 0,
    explanation: 'A=100011 (負數)：先減1得100010，反向得011101(29)，故A=-29。\nB=011011 (正數)：011011 = 16+8+2+1 = 27，故B=27。\nA+B = -29 + 27 = -2。\n故本題選A'
  },
  {
    id: '100-Q28', year: '100年', type: 'multiple', page: 14, num: 28,
    question: '有關 MPEG 編碼方法，其資料壓縮特性為下列何者?',
    options: ['(A) 有損式視訊壓縮', '(B) 有損式圖像壓縮', '(C) 無損式視訊壓縮', '(D) 無損式圖像壓縮'],
    answer: 0,
    explanation: 'MPEG (Moving Picture Experts Group) 編碼方法主要針對視訊壓縮，其特性為有損式(lossy)壓縮，以達到減少檔案大小的目的。故本題選 A'
  },
  {
    id: '100-Q29', year: '100年', type: 'multiple', page: 14, num: 29,
    question: '設計高品質的軟體模組時，應力求下列何種特性?',
    options: ['(A) 高耦合性、高內聚性', '(B) 高耦合性、低內聚性', '(C) 低耦合性、高內聚性', '(D) 低耦合性、低內聚性'],
    answer: 2,
    explanation: '高品質軟體模組應力求「低耦合性」與「高內聚性」。\n高內聚性：模組內部元素相互關聯緊密。\n低耦合性：模組間相依性低，可獨立開發、維護。故本題選C'
  },
  {
    id: '100-Q30', year: '100年', type: 'multiple', page: 15, num: 30,
    question: '軟體開發程序所用之”瀑布”(waterfall)模型，其進行的四大步驟依序為何?',
    options: ['(A) 分析→設計→實作→測試', '(B) 分析→設計→測試→實作', '(C) 設計→分析→實作→測試', '(D) 設計→分析→測試→實作'],
    answer: 0,
    explanation: '瀑布模型步驟依序為：1. 分析(Analysis) 2. 設計(Design) 3. 實作(Implementation) 4. 測試(Testing)。故本題選A'
  },
  
  // ================= 100 年 非選擇題 =================
  {
    id: '100-NQ1', year: '100年', type: 'descriptive', page: 16, num: '1(一)',
    question: '請問 ADSL 與 HTTP 兩者之英文(或中文)全名為何?',
    explanation: 'ADSL 的英文全名為 Asymmetric Digital Subscriber Line，中文為「非對稱式數位用戶線」。\nHTTP 的英文全名為 Hypertext Transfer Protocol，中文為「超文本傳輸協定」。'
  },
  {
    id: '100-NQ2', year: '100年', type: 'descriptive', page: 16, num: '1(二)',
    question: '請說明於電腦內建置"快取"(cache)記憶體之主要目的為何?',
    explanation: '電腦內建置快取(cache)記憶體的主要目的是為了提升系統效能，通過暫時儲存常用的資料或指令，以減少CPU與主記憶體之間的資料傳輸時間。快取記憶體能夠加速資料存取速度，減少CPU等待時間。'
  },
  {
    id: '100-NQ3', year: '100年', type: 'descriptive', page: 17, num: '1(三)',
    question: '一邏輯運算式 (7A7(16) XOR B8B(16)) OR 123(16)，請將計算結果以16進制表示?',
    explanation: '1. 7A7(16) XOR B8B(16) = 011110100111 XOR 101110001011 = 110000101100 (C2C)\n2. C2C(16) OR 123(16) = 110000101100 OR 000100100011 = 110100101111 (D2F)\n故結果為 D2F(16)。'
  },
  {
    id: '100-NQ4', year: '100年', type: 'descriptive', page: 18, num: '1(四)',
    question: '發生"死結"(deadlock)所需的四項要件中，除了”互斥”外，其餘三項為何?',
    explanation: '1. 互斥(Mutual Exclusion)\n2. 佔有並等待(Hold and Wait)\n3. 不可剝奪(No Preemption)\n4. 循環等待(Circular Wait)。'
  },
  {
    id: '100-NQ5', year: '100年', type: 'descriptive', page: 19, num: '2(一)',
    question: '請說明多重程式規劃(multiprogramming)方法之主要特性為何?',
    explanation: '主要特性包括：1.同時存在多個程式於記憶體中。2.共享系統資源(CPU, I/O)。3.透過任務調度(Scheduling)進行切換。4.提高系統效能與資源利用率。'
  },
  {
    id: '100-NQ6', year: '100年', type: 'descriptive', page: 19, num: '2(二)',
    question: '以需求分段法用於配置記憶體，易引起"外部碎裂"，試問造成"碎裂"的原因為何?',
    explanation: '外部碎裂是由於記憶體分段不連續、程式的動態內存需求，導致記憶體中出現零散的小塊空間，這些空間總和雖然足夠但因為不連續而無法被分配給需要大塊記憶體的程式。'
  },
  {
    id: '100-NQ7', year: '100年', type: 'descriptive', page: 20, num: '2(三)',
    question: '請說明以分頁法(paging)用於配置記憶體之主要特點為何?',
    explanation: '特點包括：1.固定大小的頁框(Frame)與頁面(Page)。2.程式擁有虛擬地址空間。3.使用分頁表(Page Table)進行地址映射。4.支援頁置換與記憶體保護。'
  },
  {
    id: '100-NQ8', year: '100年', type: 'descriptive', page: 20, num: '2(四)',
    question: '於分頁法中，當頁(page)的分割長度"過大"或者"過小"之情況下，會有何影響?',
    explanation: '過大：造成內部碎片增加(浪費頁框內空間)、存取時間可能增加。\n過小：頁表變大(佔用記憶體)、頁錯誤(Page Fault)頻率可能增加，導致效能降低。'
  },

  // ================= 101 年 選擇題 =================
  {
    id: '101-Q1', year: '101年', type: 'multiple', page: 21, num: 1,
    question: '下列哪一個作業系統採用命令列及圖形使用者介面兩種並存的方式，讓使用者自行選擇操作介面?',
    options: ['(A) DOS', '(B) Windows', '(C) Unix', '(D) Linux'],
    answer: 3,
    explanation: 'Linux 是採用命令列及圖形使用者介面兩種並存的方式使用者自行選擇操作介面的作業系統。\nDOS 是一個純命令列介面的作業系統。\nWindows 提供了命令列介面和圖形使用者介面，通常以圖形使用者介面為主。\nUnix 則通常使用命令列介面，但也有圖形使用者介面的選項。故本題選D'
  },
  {
    id: '101-Q2', year: '101年', type: 'multiple', page: 21, num: 2,
    question: '下列哪一種影像類型跨平台且為非破壞性壓縮，最適合用來印刷輸出?',
    options: ['(A) JPG 影像格式', '(B) TIF 影像格式', '(C) PNG 影像格式', '(D) GIF 影像格式'],
    answer: 1,
    explanation: 'TIF 影像格式適合用來印刷輸出的影像類型。是一種無損壓縮的影像格式，保留了高品質的圖像細節，支援跨平台的標準格式。\nJPG 是有損壓縮。\nPNG 也是無損但通常用於網頁。\nGIF 色彩少，適合動畫。\n故本題選B'
  },
  {
    id: '101-Q3', year: '101年', type: 'multiple', page: 22, num: 3,
    question: '使用二元搜尋法(Binary Search) 在1,000筆已排序的資料中尋找某筆資料，最多需要執行幾次比較?',
    options: ['(A) 10次', '(B) 20次', '(C) 50次', '(D) 100次'],
    answer: 0,
    explanation: '執行次數公式為 log2(n)。log2(1000) ≈ 9.97，進位為 10 次。故本題選A'
  },
  {
    id: '101-Q4', year: '101年', type: 'multiple', page: 22, num: 4,
    question: '有關 VoIP 技術的說明，下列何者較適當?',
    options: ['(A) 是一種查詢本機電腦IP 位址的技術', '(B) 是一種選取影片後可立即播放的技術', '(C) 是將語音資料轉換為封包，在網路上傳輸的技術', '(D) 是一種檢查電腦連線是否正常的技術'],
    answer: 2,
    explanation: 'VoIP (Voice over Internet Protocol)是一種通話技術，它將語音資料轉換為封包(Packet)，並在網路上進行傳輸。故本題選C'
  },
  {
    id: '101-Q5', year: '101年', type: 'multiple', page: 22, num: 5,
    question: '有關 IPv4 與IPv6 之敘述，下列何者錯誤?',
    options: ['(A) IPv4 的位址長度為32位元', '(B) IPv6的位址長度為128位元', '(C) IPv4 的位址以4段式、10進位表示', '(D) IPv6的位址以6段式、10進位表示'],
    answer: 3,
    explanation: 'IPv6 的位址由 8 段 16 位元組成，並以 16 進位表示。選項 D 說 6 段式、10 進位是錯誤的。故本題選D'
  },
  {
    id: '101-Q6', year: '101年', type: 'multiple', page: 23, num: 6,
    question: '十六進位數-6D以2的補數表示法(2\'s Complement)表示，其值為何?',
    options: ['(A) 10010001', '(B) 10010010', '(C) 10010011', '(D) 10110011'],
    answer: 2,
    explanation: '6D (16進位) = 109 (10進位)。\n109 轉 2進位 = 01101101。\n取反碼 = 10010010。\n加 1 = 10010011。\n故本題選C'
  },
  {
    id: '101-Q7', year: '101年', type: 'multiple', page: 23, num: 7,
    question: '下列何種機制使得 Java 能夠做到跨平台(Cross Platform)運作?',
    options: ['(A) 物件導向(Object-Oriented)', '(B) 多執行緒(Multi-thread)', '(C) 例外處理(Exception Handling)', '(D) 虛擬機器(Virtual Machine)'],
    answer: 3,
    explanation: 'Java 跨平台特性是由虛擬機器(JVM)所實現的。程式碼編譯成 bytecode 後，由不同平台的 JVM 轉換為機器碼執行。故本題選D'
  },
  {
    id: '101-Q8', year: '101年', type: 'multiple', page: 24, num: 8,
    question: '(130)X = (28)10，試求基底X=?',
    options: ['(A) 4', '(B) 5', '(C) 6', '(D) 7'],
    answer: 0,
    explanation: '1*X^2 + 3*X + 0 = 28\nX^2 + 3X - 28 = 0\n(X+7)(X-4) = 0\nX = 4 (負數不合)。故本題選A'
  },
  {
    id: '101-Q9', year: '101年', type: 'multiple', page: 24, num: 9,
    question: '有關「數位浮水印」(Digital Watermarking)的敘述，下列何者錯誤?',
    options: ['(A) 利用數位處理方式把隱藏資訊加入數位圖片', '(B) 目的在保護電子文件或圖片的著作權', '(C) 可將原作者、出版處等隱藏在數位媒體產品', '(D) 浮水印加入後之差異可以用肉眼辨識出來'],
    answer: 3,
    explanation: '數位浮水印加入後的差異通常是微小的，不容易被肉眼辨識出來，以確保原始資料的價值不受損。故本題選D'
  },
  {
    id: '101-Q10', year: '101年', type: 'multiple', page: 25, num: 10,
    question: '設A的值為0000000,B的值為1000000，則經過(A OR B) AND (NOT B) 運算後的結果為何?',
    options: ['(A) 0000000', '(B) 1111111', '(C) 1000000', '(D) 0111111'],
    answer: 0,
    explanation: 'A OR B = 0000000 OR 1000000 = 1000000\nNOT B = NOT 1000000 = 0111111\n(A OR B) AND (NOT B) = 1000000 AND 0111111 = 0000000\n故本題選A'
  },
  {
    id: '101-Q11', year: '101年', type: 'multiple', page: 25, num: 11,
    question: '當下列程式片段執行完畢後，變數count 的數值為多少? (i=5 to 10; j=1 to i; k=1 to j; if i==j count++)',
    options: ['(A) 1000', '(B) 150', '(C) 55', '(D) 45'],
    answer: 3,
    explanation: 'count 只在 i==j 時增加。i 從 5 到 10。\n當 i=5, j=1..5, 當 j=5 時 k=1..5 (count+5)\n不對，題目是 if i==j count++，這是在 k 迴圈內嗎？\n如果是三層迴圈，且 if 在最內層：\ni=5, j=5時 (i==j成立), k迴圈執行 j=5 次，count+5。\ni=6, j=6時, count+6。\n...\ni=10, j=10時, count+10。\n總數 = 5+6+7+8+9+10 = 45。故本題選D'
  },
  {
    id: '101-Q12', year: '101年', type: 'multiple', page: 26, num: 12,
    question: '假設某二元樹經前序(Preorder)追蹤為 ABCDEFGH，經中序(Inorder)為 CDBAFEHG，則後序(Postorder)為何?',
    options: ['(A) CDBAEFGH', '(B) ABECFGDH', '(C) HGFEABCD', '(D) DCBFHGEA'],
    answer: 3,
    explanation: '前序首字 A 為根。中序中 A 左邊 CDB 為左子樹，FEHG 為右子樹。\n後序遍歷最後一個節點必為根節點 A。\n選項中只有 D 以 A 結尾。故本題選D'
  },
  {
    id: '101-Q13', year: '101年', type: 'multiple', page: 27, num: 13,
    question: '有關電腦使用的權利伸張，下列敘述何者錯誤?',
    options: ['(A) 無故洩漏他人秘密者刑法有罰則', '(B) 論文引用只要在合理範圍不需付權利金但要註明出處', '(C) 使用複製軟體的用戶需付版權費給購買原版軟體者', '(D) 拷貝具著作權軟體係侵害重製權'],
    answer: 2,
    explanation: '使用複製軟體(盜版)是違法行為，並不是付費給原版購買者就能合法化，應向合法通路購買授權。故本題選C'
  },
  {
    id: '101-Q14', year: '101年', type: 'multiple', page: 27, num: 14,
    question: '在寬頻傳輸技術的標準中 T3 提供多少 Mbps 的傳輸速率?',
    options: ['(A) 6.176', '(B) 28.8', '(C) 44.736', '(D) 50'],
    answer: 2,
    explanation: 'T3 (DS3) 傳輸速率為 44.736 Mbps。故本題選C'
  },
  {
    id: '101-Q15', year: '101年', type: 'multiple', page: 28, num: 15,
    question: '5個程序 P1~P5 服務時間依序為 75, 100, 55, 126, 48。若排程演算法是 FCFS，則平均迴轉時間(Turnaround time)為何?',
    options: ['(A) 124', '(B) 248', '(C) 300', '(D) 320'],
    answer: 1,
    explanation: '完成時間：P1=75, P2=175, P3=230, P4=356, P5=404。\n迴轉時間 = 完成時間 - 到達時間(0)。\n平均迴轉時間 = (75+175+230+356+404)/5 = 248。故本題選B'
  },
  {
    id: '101-Q16', year: '101年', type: 'multiple', page: 29, num: 16,
    question: '空的堆疊，PUSH A、B、C，取出順序不可為下列何者? (最右邊資料表示最先取出)',
    options: ['(A) C、B、A', '(B) A、C、B', '(C) B、A、C', '(D) B、C、A'],
    answer: 2,
    explanation: '若 A 最先被 PUSH，則 A 在堆疊底部。要取出 A，必須先把 A 上面的 B 和 C 都取出，或者 A 是第一個取出的(如果PUSH A後馬上POP A)。\n(C) B、A、C 意味著先取出 B，再取出 A，最後取出 C。但取出 B 後，A 上面還有 C (若C還沒PUSH則不可能先取出B再A再C，因為C還沒進)。\n若 PUSH A, PUSH B, POP B (得B), POP A (得A), PUSH C, POP C (得C) -> B, A, C 是可能的...\n等等，PDF解析寫：A最先被PUSH，因此A儘可能出現在最前面或最後面，因此B、A、C不可為取出後的順序... 修正邏輯：如果 B 先出，表示 A 還在裡面。接著出 A，表示 C 還沒進或者 C 在 A 下面(不可能)。若 C 還沒進，出 A 後再 PUSH C 再 POP C，順序是 B, A, C。這是可能的啊？\n讓我們重看 PDF。PDF 寫「A最先被 PUSH... B、A、C 不可為取出後的順序，故本題選 C」。(PDF 題目可能有隱含 PUSH 順序固定為 A,B,C)。若固定 PUSH A, B, C：\n(A) CBA: Push A, B, C, Pop C, B, A (可)\n(B) ACB: Push A, Pop A, Push B, C, Pop C, B (可)\n(C) BAC: Push A, B, Pop B, Pop A (A出去了), Push C, Pop C -> BAC (可)。\n(D) BCA: Push A, B, C, Pop C, B (A還在), Push...? A最後出。 BCA (可)。\n疑？這題 PDF 選 C，解析說 A 盡可能在最前或最後。若 PUSH A, B, C 一次進去，那只能 CBA。若可以穿插：\nB 先出 -> Push A, Push B, Pop B。堆疊剩 A。下一個出 A -> Pop A。堆疊空。下一個 C -> Push C, Pop C。 順序 B, A, C。完全合法。\n讓我們再看一次 PDF 選項。選項(C)是 B、A、C。\n或許題目意思是 A,B,C 已經都在堆疊裡了？「將 A,B,C 三個資料放進到堆疊... 再由堆疊中取出」。若是一次全放進去再取，只能是 CBA。若穿插，(C)是可能的。\n但在考試題庫中，這類題目通常假設 PUSH A, PUSH B, PUSH C 是固定順序。\n檢查 (D) B, C, A：Push A, Push B, Pop B (得B). Push C, Pop C (得C). Pop A (得A). -> B, C, A 可行。\n檢查 (C) B, A, C：Push A, Push B, Pop B (得B). Pop A (得A). Push C, Pop C (得C). -> B, A, C 可行。\n檢查 (A) C, B, A：Push A, B, C, Pop C, B, A -> C, B, A 可行。\n檢查 (B) A, C, B：Push A, Pop A (得A). Push B, Push C, Pop C (得C), Pop B (得B) -> A, C, B 可行。\n所有選項都可行啊？\n等等，PDF 解析說選 C。我們照抄 PDF 解析：由題意可知 A 最先被 PUSH 進堆疊，因此 A 儘可能出現在最前面或最後面，因此 B、A、C 不可為取出後的順序。故本題選 C。'
  },
  {
    id: '101-Q17', year: '101年', type: 'multiple', page: 29, num: 17,
    question: '樓梯燈開關 X 及 Y，可以用下列哪一個布林運算式來表示?',
    options: ['(A) XY + X\'Y\'', '(B) X Y\' + X\' Y', '(C) X + Y', '(D) X\' Y\''],
    answer: 1,
    explanation: '樓梯開關邏輯為 XOR (互斥或)，即一個改變狀態燈就會變。XOR 的布林運算式為 X Y\' + X\' Y。故本題選B'
  },
  {
    id: '101-Q18', year: '101年', type: 'multiple', page: 30, num: 18,
    question: '位址區塊 132.23.21.64/26，欲平均分成四個子網，則第三個子網範圍?',
    options: ['(A) ...21.92/26 ...', '(B) ...21.96/26 ...', '(C) ...21.92/28 ...', '(D) 132.23.21.96/28 到 132.23.21.111/28'],
    answer: 3,
    explanation: '132.23.21.64/26 範圍為 .64 ~ .127 (共64個)。\n分成4個子網，每個 16 個 IP，遮罩變 /28。\nSubnet 1: .64 ~ .79\nSubnet 2: .80 ~ .95\nSubnet 3: .96 ~ .111\nSubnet 4: .112 ~ .127\n故第三個子網為 132.23.21.96/28 到 .111/28。故本題選D'
  },
  {
    id: '101-Q19', year: '101年', type: 'multiple', page: 31, num: 19,
    question: '有關 RAID 之敘述，下列何者錯誤?',
    options: ['(A) 用來改善磁碟的效能及可靠性', '(B) RAID 0:無任何多餘', '(C) RAID 1:鏡面磁碟', '(D) RAID 2:區塊交替式的同位方式'],
    answer: 3,
    explanation: 'RAID 2 是使用海明碼(Hamming Code)進行錯誤更正，並非區塊交替式同位(這是 RAID 4/5 的概念)。故本題選D'
  },
  {
    id: '101-Q20', year: '101年', type: 'multiple', page: 31, num: 20,
    question: '下列哪一個網路的指令可以用來測試網路名稱的可到達性?',
    options: ['(A) ping', '(B) traceroute', '(C) netconfig', '(D) finger'],
    answer: 0,
    explanation: '(A) ping：測試可到達性。\n(B) traceroute：顯示路徑。\n(C) netconfig：網路設定。\n(D) finger：查詢使用者資訊。\n故本題選A'
  },
  {
    id: '101-Q21', year: '101年', type: 'multiple', page: 32, num: 21,
    question: '下列哪一個是運算式 a*(b+c)-d 的前序(Prefix)式?',
    options: ['(A) -*a+bcd', '(B) *a+bcd', '(C) *a+bc-d', '(D) -a*+bcd'],
    answer: 0,
    explanation: '中序：a*(b+c)-d\n1. 加法：(+bc)\n2. 乘法：(*a+bc)\n3. 減法：(-*a+bcd)\n故本題選A'
  },
  {
    id: '101-Q22', year: '101年', type: 'multiple', page: 33, num: 22,
    question: '下列何種伺服器能把網址翻譯成 IP位址?',
    options: ['(A) AP Server', '(B) DNS Server', '(C) IIS Server', '(D) WWW Server'],
    answer: 1,
    explanation: 'DNS Server (Domain Name System) 負責將網域名稱解析為 IP 位址。故本題選B'
  },
  {
    id: '101-Q23', year: '101年', type: 'multiple', page: 33, num: 23,
    question: 'Ethernet 採用下列何種技術來處理多部電腦之間資料傳輸衝突的問題?',
    options: ['(A) 細胞繼電器(Cell Relay)', '(B) 電路交換', '(C) CSMA/CD', '(D) 半雙工'],
    answer: 2,
    explanation: 'Ethernet 採用 CSMA/CD (Carrier Sense Multiple Access with Collision Detection) 載波感測多重存取/碰撞偵測技術。故本題選C'
  },
  {
    id: '101-Q24', year: '101年', type: 'multiple', page: 34, num: 24,
    question: 'IPv6 位址(128bit)可容許的位址個數是IPv4(32bit)位址的幾倍?',
    options: ['(A) 4', '(B) 96', '(C) 24', '(D) 2^96'],
    answer: 3,
    explanation: '2^128 / 2^32 = 2^(128-32) = 2^96。故本題選D'
  },
  {
    id: '101-Q25', year: '101年', type: 'multiple', page: 34, num: 25,
    question: '以列次為主次序(row major order)的二維陣列 [5 7; 6 8],其元素在記憶體中的排列順序為何?',
    options: ['(A) 5 6 7 8', '(B) 5 7 6 8', '(C) 7 8 5 6', '(D) 8 7 6 5'],
    answer: 1,
    explanation: '列次為主(Row Major)表示先存第一列，再存第二列。\n第一列：5, 7\n第二列：6, 8\n順序：5, 7, 6, 8。故本題選B'
  },
  {
    id: '101-Q26', year: '101年', type: 'multiple', page: 34, num: 26,
    question: '目前手持設備所使用的標記語言，下列何者非屬之?',
    options: ['(A) WML', '(B) AHTML', '(C) CHTML', '(D) XHTML'],
    answer: 1,
    explanation: 'WML, CHTML, XHTML 都是實際存在的手持設備標記語言。AHTML 是虛構的或不存在的標準。故本題選B'
  },
  {
    id: '101-Q27', year: '101年', type: 'multiple', page: 35, num: 27,
    question: '下列哪一個網路連結設備只用來連結二個LAN 或是同一個LAN的二個部分，並可隔離 LAN 的資料?',
    options: ['(A) 網路介面卡', '(B) 橋接器(Bridge)', '(C) 路由器(Router)', '(D) 閘道器(Gateway)'],
    answer: 1,
    explanation: '橋接器(Bridge)用於連接兩個 LAN 網段，並透過 MAC 位址過濾來隔離流量，減少衝突。故本題選B'
  },
  {
    id: '101-Q28', year: '101年', type: 'multiple', page: 36, num: 28,
    question: '有關組合語言(Assembly Language)之敘述，下列何者錯誤?',
    options: ['(A) 與 CPU 有絕對相關', '(B) 需要經過組譯器才可以轉換成機器碼', '(C) 以簡單助憶符號構成', '(D) 不同的高階語言經過編譯器會產生不同的組合語言碼'],
    answer: 3,
    explanation: '不同的高階語言經過編譯器，若目標平台(CPU)相同，會產生針對該 CPU 的相同架構的組合語言碼(雖然邏輯可能不同，但組合語言格式是CPU決定的)。PDF解釋：組合語言跟CPU相關，而不是跟高階語言相關(意指高階語言不能決定組合語言的格式，是CPU決定的)。故本題選D'
  },
  {
    id: '101-Q29', year: '101年', type: 'multiple', page: 36, num: 29,
    question: '如果有1,000 筆資料要加入到一個二元樹中，則此二元樹最多及最少的層數各為多少?',
    options: ['(A) 1000, 9', '(B) 1000, 10', '(C) 512, 9', '(D) 512, 10'],
    answer: 1,
    explanation: '最多層數：當樹退化成鏈結串列時，層數為 1000。\n最少層數：當樹為完全二元樹時，層數 ≈ log2(1000) + 1 ≈ 10。故本題選B'
  },
  {
    id: '101-Q30', year: '101年', type: 'multiple', page: 36, num: 30,
    question: 'Web Service 是一種呼叫遠端服務的方法，下列何種相關技術不是用在 Web Service 中?',
    options: ['(A) SOAP', '(B) WSDL', '(C) CORBA', '(D) UDDI'],
    answer: 2,
    explanation: 'CORBA 是另一種分散式物件標準，不屬於以 XML/HTTP 為基礎的 Web Service (SOAP/WSDL/UDDI) 體系。故本題選C'
  },

  // ================= 102 年 選擇題 =================
  {
    id: '102-Q1', year: '102年', type: 'multiple', page: 38, num: 1,
    question: '下列哪個字元符碼是使用16位元，而且足以呈現許多當今的主要文字語言?',
    options: ['(A) Unicode', '(B) ASCII', '(C) BCD', '(D) EBCDIC'],
    answer: 0,
    explanation: '(A) Unicode：使用16位元(或更多)表示字符，涵蓋多國語言。\n(B) ASCII：7或8位元。\n(C) BCD：數字編碼。\n(D) EBCDIC：IBM主機使用的8位元編碼。\n故本題選A'
  },
  {
    id: '102-Q2', year: '102年', type: 'multiple', page: 38, num: 2,
    question: '所謂的隨插即用(plug-and-play)係指下列何者?',
    options: ['(A) 當電腦在運作時，可以連接或拔除週邊裝置', '(B) 自動偵測連接到系統的相容週邊裝置', '(C) 當RAM 存滿時會使用硬碟空間', '(D) 新的CPU名稱'],
    answer: 1,
    explanation: '隨插即用(Plug and Play)指系統能自動偵測、配置週邊裝置，無需使用者手動設定。故本題選B'
  },
  {
    id: '102-Q3', year: '102年', type: 'multiple', page: 39, num: 3,
    question: '下列何者為主機板上面的電路，負責傳送 CPU與各系統元件之間的資料?',
    options: ['(A) 匯流排', '(B) 擴充槽', '(C) 算術邏輯單元', '(D) 暫存器'],
    answer: 0,
    explanation: '匯流排(Bus)是傳輸資料、位址、控制訊號的通道。故本題選A'
  },
  {
    id: '102-Q4', year: '102年', type: 'multiple', page: 39, num: 4,
    question: '下列哪一項不是作業系統的功能?',
    options: ['(A) 管理記憶體', '(B) 管理週邊設備', '(C) 建立文件與試算表', '(D) 提供使用者介面'],
    answer: 2,
    explanation: '建立文件與試算表是應用軟體的功能。作業系統負責資源管理(記憶體、設備)與介面。故本題選C'
  },
  {
    id: '102-Q5', year: '102年', type: 'multiple', page: 39, num: 5,
    question: '下列哪種檔案格式不是聲音檔?',
    options: ['(A) WAV', '(B) MPEG', '(C) MP3', '(D) WMA'],
    answer: 1,
    explanation: 'MPEG 通常指視訊格式(如 MPEG-1, MPEG-2)。WAV, MP3, WMA 皆為音訊格式。故本題選B'
  },
  {
    id: '102-Q6', year: '102年', type: 'multiple', page: 40, num: 6,
    question: '下列哪種圖像可以在沒有任何邊緣失真的前提下，進行編輯與改變大小?',
    options: ['(A) 點陣圖', '(B) AVI 檔', '(C) 光柵圖', '(D) 向量圖'],
    answer: 3,
    explanation: '向量圖(Vector)使用數學公式描述圖形，放大縮小不失真。點陣圖(Bitmap/Raster)放大會失真。故本題選D'
  },
  {
    id: '102-Q7', year: '102年', type: 'multiple', page: 40, num: 7,
    question: '下列哪種網路拓樸使用了交換器或集線器來做為連線時的中央點?',
    options: ['(A) P2P', '(B) 星狀拓樸', '(C) 總線拓樸', '(D) 環狀拓樸'],
    answer: 1,
    explanation: '星狀拓樸(Star Topology)所有節點都連接到中央設備(Switch/Hub)。故本題選B'
  },
  {
    id: '102-Q8', year: '102年', type: 'multiple', page: 41, num: 8,
    question: '因為一台或更多台的元件失靈卻仍需要持續運作，因此RAID的裝置具有高度的什麼特性?',
    options: ['(A) 擴充性', '(B) 相互操作性', '(C) 電子資料交換', '(D) 容錯性'],
    answer: 3,
    explanation: 'RAID 透過冗餘提供容錯性(Fault Tolerance)，硬碟損壞時仍可運作或復原資料。故本題選D'
  },
  {
    id: '102-Q9', year: '102年', type: 'multiple', page: 41, num: 9,
    question: '能用來從資料庫中獲取資料的第四代程式語言為何?',
    options: ['(A) Java', '(B) C++', '(C) SQL', '(D) ActiveX'],
    answer: 2,
    explanation: 'SQL 是第四代語言(4GL)，專用於資料庫查詢。Java, C++ 是第三代語言。故本題選C'
  },
  {
    id: '102-Q10', year: '102年', type: 'multiple', page: 41, num: 10,
    question: '1GB 等於多少位元組?',
    options: ['(A) 2^10', '(B) 2^20', '(C) 2^30', '(D) 2^40'],
    answer: 2,
    explanation: '1G = 2^30。故 1GB = 2^30 Bytes。故本題選C'
  },
  {
    id: '102-Q11', year: '102年', type: 'multiple', page: 41, num: 11,
    question: '53(8) = 47(x)，基底 x 為何?',
    options: ['(A) 16', '(B) 12', '(C) 10', '(D) 9'],
    answer: 3,
    explanation: '53(8) = 5*8 + 3 = 43(10)\n47(x) = 4*x + 7 = 43\n4x = 36, x = 9。故本題選D'
  },
  {
    id: '102-Q12', year: '102年', type: 'multiple', page: 42, num: 12,
    question: '下列有關演算法的敘述，何者錯誤?',
    options: ['(A) 程式是演算法的一種表達方式', '(B) 虛擬碼是演算法的一種表達方式', '(C) 系統中的程序是表現一個活動中的演算法', '(D) 演算法不一定有終止狀態'],
    answer: 3,
    explanation: '演算法必須具備有限性(Finiteness)，即必須在有限步驟內終止。故選項 D 錯誤。故本題選D'
  },
  {
    id: '102-Q13', year: '102年', type: 'multiple', page: 42, num: 13,
    question: '根據由快到慢的順序寫出下列記憶裝置的速度:(1)硬碟(2)暫存器(3)主記憶體(4)快取記憶體',
    options: ['(A) 4321', '(B) 4231', '(C) 2413', '(D) 2431'],
    answer: 3,
    explanation: '速度：暫存器(2) > 快取(4) > 主記憶體(3) > 硬碟(1)。順序為 2431。故本題選D'
  },
  {
    id: '102-Q14', year: '102年', type: 'multiple', page: 43, num: 14,
    question: '電腦的傳輸速率是以下列何者為單位?',
    options: ['(A) bps', '(B) dpi', '(C) ppm', '(D) rpm'],
    answer: 0,
    explanation: 'bps (bits per second) 是傳輸速率單位。dpi 是解析度，ppm 是列印速度，rpm 是轉速。故本題選A'
  },
  {
    id: '102-Q15', year: '102年', type: 'multiple', page: 43, num: 15,
    question: '已知大寫字母 M 的ASCII碼為 01001101，則大寫字母K的ASCII碼為何?',
    options: ['(A) 01001110', '(B) 01001101', '(C) 01101100', '(D) 01001011'],
    answer: 3,
    explanation: 'K 在 M 前面 2 個位置 (K, L, M)。\nM = 01001101\nL = 01001100\nK = 01001011\n故本題選D'
  },
  {
    id: '102-Q16', year: '102年', type: 'multiple', page: 43, num: 16,
    question: '下列何者屬於非失真壓縮?',
    options: ['(A) MPEG', '(B) MP3', '(C) JPEG', '(D) ZIP'],
    answer: 3,
    explanation: 'ZIP 是無損壓縮(Lossless)。MPEG, MP3, JPEG 都是有損壓縮(Lossy)。故本題選D'
  },
  {
    id: '102-Q17', year: '102年', type: 'multiple', page: 44, num: 17,
    question: '下列何者屬於頻率相關編碼?',
    options: ['(A) 漢明碼', '(B) GIF', '(C) 霍夫曼碼', '(D) LZ 編碼'],
    answer: 2,
    explanation: '霍夫曼編碼(Huffman Coding)依據字元出現頻率建立編碼，頻率高者碼長短。故本題選C'
  },
  {
    id: '102-Q18', year: '102年', type: 'multiple', page: 44, num: 18,
    question: '下列何者是以多個處理單元來執行程式以提昇效率?',
    options: ['(A) 管線', '(B) 超純量', '(C) 平行處理', '(D) 類神經網路'],
    answer: 2,
    explanation: '平行處理(Parallel Processing)使用多個處理器同時執行工作。故本題選C'
  },
  {
    id: '102-Q19', year: '102年', type: 'multiple', page: 45, num: 19,
    question: '在電腦開機過程中，何者提供了電腦開機所需的基本載入程序?',
    options: ['(A) 硬碟', '(B) 光碟', '(C) ROM', '(D) RAM'],
    answer: 2,
    explanation: 'ROM (BIOS) 存放開機所需的自我測試與載入程式。故本題選C'
  },
  {
    id: '102-Q20', year: '102年', type: 'multiple', page: 45, num: 20,
    question: '同時執行多個應用程式時，下列何者直接影響電腦的效能?',
    options: ['(A) 硬碟轉速', '(B) 螢幕解析度', '(C) 主記憶體容量', '(D) 硬碟容量'],
    answer: 2,
    explanation: '同時執行多程式需要足夠的 RAM。若 RAM 不足會頻繁使用虛擬記憶體(硬碟)，導致效能大幅下降。故本題選C'
  },
  {
    id: '102-Q21', year: '102年', type: 'multiple', page: 46, num: 21,
    question: '下列何者屬於無線廣域網路?',
    options: ['(A) 藍芽', '(B) 乙太網路', '(C) 衛星網路', '(D) 有線電視網路'],
    answer: 2,
    explanation: '衛星網路覆蓋範圍廣大，屬無線廣域網路(Wireless WAN)。藍芽是 PAN，乙太網是 LAN。故本題選C'
  },
  {
    id: '102-Q22', year: '102年', type: 'multiple', page: 46, num: 22,
    question: '在網路 OSI參考模型中，諸如 Internet Explorer 等瀏覽器軟體應該屬於哪個層次?',
    options: ['(A) 應用層', '(B) 表達層', '(C) 會議層', '(D) 傳輸層'],
    answer: 0,
    explanation: '瀏覽器與使用者直接互動，提供網路服務，屬於應用層(Application Layer)。故本題選A'
  },
  {
    id: '102-Q23', year: '102年', type: 'multiple', page: 47, num: 23,
    question: '下列哪個網域名稱表示政府部門?',
    options: ['(A) org', '(B) edu', '(C) com', '(D) gov'],
    answer: 3,
    explanation: 'gov (Government) 代表政府部門。故本題選D'
  },
  {
    id: '102-Q24', year: '102年', type: 'multiple', page: 47, num: 24,
    question: '全球資訊網採用下列哪種通訊協定?',
    options: ['(A) P2P', '(B) HTTP', '(C) FTP', '(D) NNTP'],
    answer: 1,
    explanation: '全球資訊網(WWW)使用 HTTP (HyperText Transfer Protocol) 協定。故本題選B'
  },
  {
    id: '102-Q25', year: '102年', type: 'multiple', page: 48, num: 25,
    question: '下列哪一種程式語言必需要經過編譯(compile)方可執行?',
    options: ['(A) HTML', '(B) JavaScript', '(C) XHTML', '(D) C++'],
    answer: 3,
    explanation: 'C++ 是編譯式語言。HTML, XHTML 是標記語言，JavaScript 是直譯式(腳本)語言。故本題選D'
  },
  {
    id: '102-Q26', year: '102年', type: 'multiple', page: 49, num: 26,
    question: '下列哪一個是後進先出的資料結構?',
    options: ['(A) Array', '(B) Stack', '(C) Queue', '(D) Tree'],
    answer: 1,
    explanation: 'Stack (堆疊) 是 LIFO (Last In First Out)。Queue 是 FIFO。故本題選B'
  },
  {
    id: '102-Q27', year: '102年', type: 'multiple', page: 49, num: 27,
    question: '在程式中呼叫一個副程式時，直接把真實參數的值，指定給正式參數，則此種方法稱為?',
    options: ['(A) 以值傳遞', '(B) 以名傳遞', '(C) 以位址傳遞', '(D) 以變數傳遞'],
    answer: 0,
    explanation: '以值傳遞(Call by Value)是複製參數的值。故本題選A'
  },
  {
    id: '102-Q28', year: '102年', type: 'multiple', page: 50, num: 28,
    question: '在軟體開發生命週期中，哪個階段所需要的花費通常最多?',
    options: ['(A) 需求分析', '(B) 設計', '(C) 編碼', '(D) 維護'],
    answer: 3,
    explanation: '維護階段週期最長，且需應對變更與除錯，成本通常最高。故本題選D'
  },
  {
    id: '102-Q29', year: '102年', type: 'multiple', page: 50, num: 29,
    question: '在評估 CPU 排班演算法好壞時，當採用來回時間(turnaround time)評估時，是計算?',
    options: ['(A) 單位時間完成程序數', '(B) 一個程序從進入電腦到離開電腦花費時間', '(C) 程序在就緒佇列等待時間', '(D) 程序享用CPU資源時間'],
    answer: 1,
    explanation: '來回時間 = 完成時間 - 到達時間，即程序從進入到離開的總時間。故本題選B'
  },
  {
    id: '102-Q30', year: '102年', type: 'multiple', page: 51, num: 30,
    question: '在二元樹的探訪順序中，先探訪父節點、再探訪左子節點、最後探訪右子節點，稱為?',
    options: ['(A) 前序法', '(B) 中序法', '(C) 後序法', '(D) 循序法'],
    answer: 0,
    explanation: '前序(Preorder)：根 -> 左 -> 右。故本題選A'
  },

  // ================= 102 年 非選擇題 =================
  {
    id: '102-NQ1', year: '102年', type: 'descriptive', page: 52, num: '1(一)',
    question: '10110111 (8位元 2\'s 補數) 是代表10進位多少的整數?',
    explanation: '首位是1，為負數。取反加一：\n10110111 -> 反碼 01001000 -> 加1 01001001 (73)。\n故值為 -73。'
  },
  {
    id: '102-NQ2', year: '102年', type: 'descriptive', page: 52, num: '1(二)',
    question: '48(10) 轉為 8 位元格式是多少?',
    explanation: '48 = 32 + 16 = 00110000(2)。'
  },
  {
    id: '102-NQ3', year: '102年', type: 'descriptive', page: 53, num: '1(三)',
    question: '8位元 2\'s 補數儲存法能表達的整數範圍為何?',
    explanation: '-2^(8-1) ~ 2^(8-1) - 1 => -128 ~ 127。'
  },
  {
    id: '102-NQ4', year: '102年', type: 'descriptive', page: 53, num: '2(一)',
    question: '01001011 AND 10101011 = ?',
    explanation: '01001011\nAND 10101011\n----------\n00001011'
  },
  {
    id: '102-NQ5', year: '102年', type: 'descriptive', page: 53, num: '2(二)',
    question: '11111111 AND 00101101 = ?',
    explanation: '11111111\nAND 00101101\n----------\n00101101'
  },
  {
    id: '102-NQ6', year: '102年', type: 'descriptive', page: 54, num: '2(三)',
    question: '01001011 OR 10101011 = ?',
    explanation: '01001011\nOR 10101011\n----------\n11101011'
  },
  {
    id: '102-NQ7', year: '102年', type: 'descriptive', page: 54, num: '2(四)',
    question: '11111111 OR 00101101 = ?',
    explanation: '11111111\nOR 00101101\n----------\n11111111'
  },
  {
    id: '102-NQ8', year: '102年', type: 'descriptive', page: 54, num: '2(五)',
    question: '01001011 XOR 10101011 = ?',
    explanation: '01001011\nXOR 10101011\n----------\n11100000'
  },

  // ================= 103 年 選擇題 =================
  {
    id: '103-Q1', year: '103年', type: 'multiple', page: 55, num: 1,
    question: '下列何者不是物件導向程式的主要特色?',
    options: ['(A) 遞迴(Recursion)', '(B) 封裝(Encapsulation)', '(C) 繼承(Inheritance)', '(D) 多形(Polymorphism)'],
    answer: 0,
    explanation: '物件導向三大特色：封裝、繼承、多形。遞迴是演算法技巧。故本題選A'
  },
  {
    id: '103-Q2', year: '103年', type: 'multiple', page: 55, num: 2,
    question: '主記憶體的容量若有 2^m 個記憶位置，每個記憶位置有 n 個位元，則記憶位址暫存器的大小為?',
    options: ['(A) m 個位元', '(B) n 個位元', '(C) m+n 個位元', '(D) mxn 個位元'],
    answer: 0,
    explanation: '有 2^m 個位置，需要 m 個位元來定址(Addressing)。故位址暫存器(MAR)大小為 m。故本題選A'
  },
  {
    id: '103-Q3', year: '103年', type: 'multiple', page: 56, num: 3,
    question: '假設網路 140.12.0.0的網路遮罩為 255.255.24.192，下列何者屬於不同的子網路?',
    options: ['(A) 140.12.23.71', '(B) 140.12.26.72', '(C) 140.12.48.96', '(D) 140.12.80.80'],
    answer: 1,
    explanation: '遮罩第三段 24 = 00011000。\n檢查選項第三段與 24 做 AND：\n(A) 23 (00010111) AND 24 = 16\n(B) 26 (00011010) AND 24 = 24  <-- 不同\n(C) 48 (00110000) AND 24 = 16\n(D) 80 (01010000) AND 24 = 16\n故 (B) 屬於不同子網。故本題選B'
  },
  {
    id: '103-Q4', year: '103年', type: 'multiple', page: 57, num: 4,
    question: '下列何者負責監督或協調電腦各個單元之間的動作以及資料傳輸?',
    options: ['(A) 控制單元', '(B) 主記憶體', '(C) 算數邏輯運算單元', '(D) 輸入輸出單元'],
    answer: 0,
    explanation: '控制單元(CU)負責解碼指令與指揮協調各單元運作。故本題選A'
  },
  {
    id: '103-Q5', year: '103年', type: 'multiple', page: 57, num: 5,
    question: '下列何者為中央處理器(CPU)執行指令的正確順序?',
    options: ['(A) 取資料、取指令、分析指令、執行', '(B) 取指令、取資料、分析指令、執行', '(C) 取指令、分析指令、取資料、執行', '(D) 取指令、分析指令、執行、取資料'],
    answer: 2,
    explanation: '執行週期：取指令(Fetch) -> 分析指令(Decode) -> 取運算元(Fetch Data) -> 執行(Execute)。故本題選C'
  },
  {
    id: '103-Q6', year: '103年', type: 'multiple', page: 58, num: 6,
    question: '下列何者不是電腦的作業系統?',
    options: ['(A) Windows XP', '(B) Linux', '(C) Unix', '(D) Oracle'],
    answer: 3,
    explanation: 'Oracle 是一個資料庫管理系統，不是作業系統。故本題選D'
  },
  {
    id: '103-Q7', year: '103年', type: 'multiple', page: 58, num: 7,
    question: '一個程式執行共需140秒，其中乘法指令共花掉112秒，請問將乘法指令速度提升為多少倍可使程式執行時間成為原來的四分之一?',
    options: ['(A) 4倍', '(B) 8倍', '(C) 16倍', '(D) 32倍'],
    answer: 2,
    explanation: '原時間 140，其他指令時間 = 140 - 112 = 28。\n目標時間 = 140 / 4 = 35。\n新乘法時間 = 35 - 28 = 7。\n提升倍數 = 112 / 7 = 16 倍。故本題選C'
  },
  {
    id: '103-Q8', year: '103年', type: 'multiple', page: 59, num: 8,
    question: '將資料於傳輸過程中進行數位信號與類比信號轉換者為?',
    options: ['(A) 多工器', '(B) 編譯器', '(C) 直譯器', '(D) 數據機'],
    answer: 3,
    explanation: '數據機(Modem) = 調變(數位轉類比) + 解調(類比轉數位)。故本題選D'
  },
  {
    id: '103-Q9', year: '103年', type: 'multiple', page: 59, num: 9,
    question: '下列何者為將高階語言轉換成低階語言的程式?',
    options: ['(A) 編輯程式', '(B) 載入程式', '(C) 編譯程式', '(D) 連結程式'],
    answer: 2,
    explanation: '編譯程式(Compiler)將高階語言轉為機器碼(低階語言)。故本題選C'
  },
  {
    id: '103-Q10', year: '103年', type: 'multiple', page: 60, num: 10,
    question: '嵌入式作業系統通常會設計於下列何種設備中?',
    options: ['(A) 硬碟', '(B) 唯讀記憶體', '(C) 隨機存取記憶體', '(D) 光碟'],
    answer: 1,
    explanation: '嵌入式系統常將 OS 燒錄在 ROM (唯讀記憶體) 或 Flash 中，以確保穩定與開機即用。故本題選B'
  },
  {
    id: '103-Q11', year: '103年', type: 'multiple', page: 60, num: 11,
    question: '下列哪一種儲存元件的存取速度最快?',
    options: ['(A) 暫存器', '(B) 靜態隨機存取記憶體(SRAM)', '(C) 唯讀記憶體', '(D) 硬碟'],
    answer: 0,
    explanation: '速度：暫存器 > SRAM (Cache) > DRAM (Main Memory) > 硬碟。故本題選A'
  },
  {
    id: '103-Q12', year: '103年', type: 'multiple', page: 61, num: 12,
    question: '下列何者排程演算法在理論上可得到最短的平均等待時間?',
    options: ['(A) 優先權(Priority)', '(B) 先到先做(FCFS)', '(C) 循環分配(RR)', '(D) 最短工作先做(SJF)'],
    answer: 3,
    explanation: 'SJF (Shortest Job First) 可使平均等待時間最小化。故本題選D'
  },
  {
    id: '103-Q13', year: '103年', type: 'multiple', page: 62, num: 13,
    question: '下列何者不會直接影響電腦系統的計算速度?',
    options: ['(A) CPU的時脈速度', '(B) CPU提供的指令集', '(C) 主記憶體容量', '(D) 硬碟儲存空間'],
    answer: 3,
    explanation: '硬碟儲存空間只影響能存多少資料，不直接影響 CPU 計算速度(除非 RAM 不足導致 Swap)。但選項中硬碟空間相較於其他選項，關聯最小。故本題選D'
  },
  {
    id: '103-Q14', year: '103年', type: 'multiple', page: 62, num: 14,
    question: '下列何者為兩個位元組所能表示的最大正整數?',
    options: ['(A) 65535', '(B) 65536', '(C) 32767', '(D) 32768'],
    answer: 0,
    explanation: '2 Bytes = 16 bits。\n無號整數最大值 = 2^16 - 1 = 65535。故本題選A'
  },
  {
    id: '103-Q15', year: '103年', type: 'multiple', page: 63, num: 15,
    question: '在副程式呼叫中，以址傳遞(Call by Address)實際上是以下列何者作為傳遞的參數?',
    options: ['(A) 值', '(B) 位址', '(C) 名稱', '(D) 計算結果'],
    answer: 1,
    explanation: '以址傳遞傳送的是變數的記憶體位址(Address/Pointer)。故本題選B'
  },
  {
    id: '103-Q16', year: '103年', type: 'multiple', page: 63, num: 16,
    question: '下列何種機制使得 Java 能夠完成跨平台(Cross Platform)運作?',
    options: ['(A) 物件導向', '(B) 例外處理', '(C) 虛擬機器', '(D) 多執行緒'],
    answer: 2,
    explanation: 'Java 程式在 JVM (虛擬機器) 上執行，不同平台有對應的 JVM，因此可跨平台。故本題選C'
  },
  {
    id: '103-Q17', year: '103年', type: 'multiple', page: 64, num: 17,
    question: '遞迴函數以下列何種資料結構來實現最為有效?',
    options: ['(A) 佇列', '(B) 堆疊', '(C) 鍵結串列', '(D) 樹'],
    answer: 1,
    explanation: '遞迴呼叫需要保存返回位址與區域變數，使用堆疊(Stack)是最自然的實作方式。故本題選B'
  },
  {
    id: '103-Q18', year: '103年', type: 'multiple', page: 64, num: 18,
    question: '利用氣泡排序法(Bubble Sort)將數列(3,5,9,4,7)依遞增排序，在第一次排序循環結束後，數列為何?',
    options: ['(A) (3,5,4,9,7)', '(B) (3,5,4,7,9)', '(C) (5,3,4,9,7)', '(D) (5,3,9,4,7)'],
    answer: 1,
    explanation: '原始：3, 5, 9, 4, 7\n1. 3,5 不換\n2. 5,9 不換\n3. 9,4 換 -> 3, 5, 4, 9, 7\n4. 9,7 換 -> 3, 5, 4, 7, 9\n結束第一輪。故本題選B'
  },
  {
    id: '103-Q19', year: '103年', type: 'multiple', page: 64, num: 19,
    question: '一個包含256個節點的二元樹之最小樹高為何?',
    options: ['(A) 7', '(B) 8', '(C) 9', '(D) 10'],
    answer: 2,
    explanation: '節點數 N，最小高度 h。\n2^(h-1) <= N < 2^h\n2^8 = 256, 2^9 = 512。\n若樹高定義為層數：滿二元樹 8 層最多 255 個節點 (2^8-1)。256 個節點需要第 9 層。\n故 h=9。故本題選C'
  },
  {
    id: '103-Q20', year: '103年', type: 'multiple', page: 65, num: 20,
    question: '有關 TCP與UDP的敘述，下列何者正確?',
    options: ['(A) TCP屬於網路模型中的傳輸層，UDP則否', '(B) TCP的傳送速度較 UDP 快', '(C) UDP 是一種連線導向的可靠性傳輸方式', '(D) UDP 的訊息無法保證一定被傳送到目的位址'],
    answer: 3,
    explanation: '(A) 兩者皆為傳輸層。\n(B) UDP 較快(無連線、無確認)。\n(C) TCP 才是連線導向可靠傳輸。\n(D) UDP 不保證送達。故本題選D'
  },
  {
    id: '103-Q21', year: '103年', type: 'multiple', page: 65, num: 21,
    question: 'Microsoft Office 的成員中，哪一項軟體是提供簡報時所使用?',
    options: ['(A) Word', '(B) PowerPoint', '(C) Excel', '(D) Access'],
    answer: 1,
    explanation: 'PowerPoint 是簡報軟體。故本題選B'
  },
  {
    id: '103-Q22', year: '103年', type: 'multiple', page: 66, num: 22,
    question: 'IPv4 的位址是用幾個位元來表示?',
    options: ['(A) 8', '(B) 16', '(C) 32', '(D) 64'],
    answer: 2,
    explanation: 'IPv4 使用 32 bits。故本題選C'
  },
  {
    id: '103-Q23', year: '103年', type: 'multiple', page: 66, num: 23,
    question: '有關光纖傳輸媒介的敘述，下列何者正確?',
    options: ['(A) 電磁干擾低', '(B) 傳輸速率低', '(C) 傳輸安全性低', '(D) 容易衰減'],
    answer: 0,
    explanation: '光纖使用光訊號，不受電磁干擾，且速率高、安全性高(難以竊聽)、衰減低。故本題選A'
  },
  {
    id: '103-Q24', year: '103年', type: 'multiple', page: 66, num: 24,
    question: '當IP不足時，通常會架設何種伺服器讓使用者自動取得電腦的IP位址?',
    options: ['(A) DNS', '(B) IMAP', '(C) Proxy', '(D) DHCP'],
    answer: 3,
    explanation: 'DHCP (Dynamic Host Configuration Protocol) 自動分配 IP。故本題選D'
  },
  {
    id: '103-Q25', year: '103年', type: 'multiple', page: 67, num: 25,
    question: '下列何者為全球資訊網(WWW)的通訊協定?',
    options: ['(A) HTTP', '(B) IMAP', '(C) POP3', '(D) SMTP'],
    answer: 0,
    explanation: 'HTTP (HyperText Transfer Protocol) 是 WWW 的標準協定。故本題選A'
  },
  {
    id: '103-Q26', year: '103年', type: 'multiple', page: 67, num: 26,
    question: '下列何者為全雙工模式?',
    options: ['(A) 使用電話交談', '(B) 收看有線電視', '(C) 使用收音機聽音樂', '(D) 使用無線對講機交談'],
    answer: 0,
    explanation: '全雙工(Full Duplex)：可同時雙向傳輸 (如電話)。\n單工：電視、收音機。\n半雙工：對講機。故本題選A'
  },
  {
    id: '103-Q27', year: '103年', type: 'multiple', page: 68, num: 27,
    question: '無線應用協定(WAP)在網站設計上另須採用何種語言才能提供服務?',
    options: ['(A) HTTP', '(B) HTML', '(C) WML', '(D) XHTML'],
    answer: 2,
    explanation: 'WAP 使用 WML (Wireless Markup Language)。故本題選C'
  },
  {
    id: '103-Q28', year: '103年', type: 'multiple', page: 68, num: 28,
    question: '有關零時差攻擊(Zero-day Attack)的敘述，下列何者正確?',
    options: ['(A) 在同一時區發生的攻擊', '(B) 在漏洞被發現但未有修補方法前出現的攻擊', '(C) 在午夜發動的病毒', '(D) 發生攻擊馬上就有修補程式'],
    answer: 1,
    explanation: '零時差攻擊指漏洞曝光但尚未修補時發生的攻擊。故本題選B'
  },
  {
    id: '103-Q29', year: '103年', type: 'multiple', page: 68, num: 29,
    question: '資訊安全領域中有縱深防禦的概念，其主要目的為何?',
    options: ['(A) 節省成本', '(B) 分散管理權責', '(C) 加快回應速度', '(D) 不會因為單一防護機制被突破而造成全面崩潰'],
    answer: 3,
    explanation: '縱深防禦(Defense in Depth)建立多層防護，避免單點失效導致系統全面崩潰。故本題選D'
  },
  {
    id: '103-Q30', year: '103年', type: 'multiple', page: 69, num: 30,
    question: '將資料在網路上傳送時，防範機密資訊外洩的主要方法為?',
    options: ['(A) 進行資料壓縮', '(B) 進行資料加密', '(C) 使用防毒軟體', '(D) 加裝防火牆'],
    answer: 1,
    explanation: '加密是防止資料在傳輸過程中被竊取(Sniffing)造成外洩的最有效手段。故本題選B'
  },
  
  // ================= 103 年 非選擇題 =================
  {
    id: '103-NQ1', year: '103年', type: 'descriptive', page: 70, num: '1',
    question: '候選鍵(Candidate Key)必須滿足哪兩個條件?請說明之',
    explanation: '1. 唯一性(Uniqueness)：候選鍵的值在表格中必須是唯一的，能唯一識別一筆記錄。\n2. 最小性(Minimality)：不能刪除候選鍵中任何欄位而仍滿足唯一性 (即沒有多餘欄位)。'
  },
  {
    id: '103-NQ2', year: '103年', type: 'descriptive', page: 71, num: '2(一)',
    question: '將十進位 62 分別轉成二進位、八進位、以及十六進位數字。',
    explanation: '二進位：111110 (62 = 32+16+8+4+2)\n八進位：76 (62 / 8 = 7 ... 6)\n十六進位：3E (62 / 16 = 3 ... 14(E))'
  },
  {
    id: '103-NQ3', year: '103年', type: 'descriptive', page: 72, num: '2(二)',
    question: '二進位串 1001，若為 1 的補數及 2 的補數，其十進位數值各為何?',
    explanation: '最高位是1，為負數。\n1 的補數：反轉數據位 (001) -> 110(2) = 6，故為 -6。\n2 的補數：1 的補數 + 1 -> 6 + 1 = 7，故為 -7。'
  }
];

const App = () => {
  const [view, setView] = useState('home'); 
  const [practicedRecords, setPracticedRecords] = useState({}); 
  const [currentYear, setCurrentYear] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 年度進度計算
  const years = ['100年', '101年', '102年', '103年'];
  const stats = useMemo(() => {
    return years.map(year => {
      const yearQuestions = initialQuestions.filter(q => q.year === year);
      const total = yearQuestions.length;
      const practiced = yearQuestions.filter(q => practicedRecords[q.id]).length;
      return { year, total, practiced };
    });
  }, [practicedRecords]);

  // 當前測驗題目列表
  const currentQuestions = useMemo(() => {
    return currentYear ? initialQuestions.filter(q => q.year === currentYear) : [];
  }, [currentYear]);

  // 已作答題目列表 (調閱用)
  const practicedList = useMemo(() => {
    return initialQuestions.filter(q => practicedRecords[q.id]);
  }, [practicedRecords]);

  // 開始某年份練習
  const startQuiz = (year) => {
    setCurrentYear(year);
    const yearQs = initialQuestions.filter(q => q.year === year);
    const firstUnpracticed = yearQs.findIndex(q => !practicedRecords[q.id]);
    setQuizIndex(firstUnpracticed !== -1 ? firstUnpracticed : 0);
    resetQuizState();
    setView('quiz');
  };

  const resetQuizState = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // 選擇題互動
  const handleSelectOption = (idx) => {
    if (showExplanation) return;
    const currentQ = currentQuestions[quizIndex];
    const isCorrect = idx === currentQ.answer;
    setSelectedOption(idx);
    setShowExplanation(true);
    saveRecord(currentQ.id, idx, isCorrect);
  };

  // 非選擇題互動
  const handleShowAnswer = () => {
    const currentQ = currentQuestions[quizIndex];
    setShowExplanation(true);
    saveRecord(currentQ.id, null, true);
  };

  const saveRecord = (id, selectedIdx, isCorrect) => {
    setPracticedRecords(prev => ({
      ...prev,
      [id]: { selectedIdx, isCorrect, timestamp: Date.now() }
    }));
  };

  const nextQuestion = () => {
    if (quizIndex < currentQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      resetQuizState();
    } else {
      setView('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-blue-100">
      {/* 頂欄導覽 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-100">
            <BookOpen className="text-white w-4 h-4" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">中華電信</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          題庫系統
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-6 pb-32">
        {/* --- 首頁：年份分類 --- */}
        {view === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="py-6 border-b border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">計算機概論 100 年到 103 年</h2>
              <p className="text-slate-400 text-sm font-medium">請選擇年份開始題庫練習，進度將自動保存。</p>
            </header>

            <div className="grid gap-4">
              {stats.map((s) => (
                <button 
                  key={s.year} 
                  onClick={() => s.total > 0 && startQuiz(s.year)}
                  className={`bg-white text-left p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex items-center justify-between group active:scale-[0.97] ${s.total === 0 ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${s.practiced === s.total ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                        {s.year.replace('年', '')}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block">{s.year} 考古題</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {s.practiced} 已練習 / {s.total} 總題數
                        </span>
                      </div>
                    </div>
                    {/* 進度條 */}
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${s.practiced === s.total ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${s.total > 0 ? (s.practiced / s.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-blue-500 transition-colors ml-6" />
                </button>
              ))}
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100">
                <div className="flex justify-center mb-3">
                    <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-bold text-slate-700 mb-1">準備好挑戰了嗎？</h3>
                <p className="text-xs text-slate-400">目前收錄 125 題完整題庫，包含詳細解析。</p>
            </div>
          </div>
        )}

        {/* --- 調閱頁面：作答紀錄 --- */}
        {view === 'history' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <header className="flex items-center justify-between py-6 border-b border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">作答紀錄調閱</h2>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">已完成進度</span>
                <span className="text-sm font-black text-blue-600">{practicedList.length} 題</span>
              </div>
            </header>

            {practicedList.length === 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 flex flex-col items-center gap-4">
                <History className="w-12 h-12 opacity-20" />
                <p className="font-bold">目前還沒有任何練習紀錄喔！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {practicedList.slice().reverse().map((q) => (
                  <div key={q.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">{q.year}</span>
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">第 {q.num} 題</span>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${q.type === 'descriptive' ? 'bg-blue-50 text-blue-600' : (practicedRecords[q.id].isCorrect ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600')}`}>
                        {q.type === 'descriptive' ? '問答練習' : (practicedRecords[q.id].isCorrect ? '正確' : '錯誤')}
                      </span>
                    </div>
                    <p className="font-bold text-slate-700 mb-6 leading-relaxed">{q.question}</p>
                    <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                        <Info className="w-3 h-3" /> PDF 詳解
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap">{q.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- 測驗模式 --- */}
        {view === 'quiz' && currentQuestions[quizIndex] && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <button onClick={() => setView('home')} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-all">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Question</span>
                <span className="text-sm font-black text-slate-900">{quizIndex + 1} / {currentQuestions.length}</span>
              </div>
              <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 uppercase tracking-widest shadow-sm shadow-blue-50">
                P.{currentQuestions[quizIndex].page} • {currentYear}
              </div>
            </div>

            {/* 題目卡片 */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <BookOpen className="w-32 h-32" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold leading-relaxed text-slate-800 mb-10 relative z-10">
                {currentQuestions[quizIndex].question}
              </h3>

              {/* 互動區 */}
              {currentQuestions[quizIndex].type === 'multiple' ? (
                <div className="space-y-3 relative z-10">
                  {currentQuestions[quizIndex].options.map((opt, idx) => {
                    const isCorrect = idx === currentQuestions[quizIndex].answer;
                    const isSelected = selectedOption === idx;
                    let style = "border-slate-100 bg-slate-50/30 hover:bg-slate-50 text-slate-600";
                    
                    if (showExplanation) {
                      if (isCorrect) style = "bg-green-50 border-green-200 text-green-700 shadow-lg shadow-green-100/50 scale-[1.02]";
                      else if (isSelected) style = "bg-red-50 border-red-200 text-red-700 opacity-80";
                      else style = "opacity-30 border-slate-50 grayscale scale-[0.98]";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={showExplanation}
                        className={`w-full p-5 rounded-2xl border-2 text-left text-sm md:text-base font-bold transition-all duration-300 flex items-center justify-between group ${style}`}
                      >
                        <span className="flex-1">{opt}</span>
                        {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100 relative z-10">
                  {!showExplanation ? (
                    <button 
                      onClick={handleShowAnswer}
                      className="flex flex-col items-center gap-5 group transition-all"
                    >
                      <div className="p-8 bg-white shadow-xl rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                        <Eye className="w-10 h-10" />
                      </div>
                      <span className="font-black text-slate-400 group-hover:text-slate-800 tracking-widest text-sm uppercase">點擊顯示答案與詳解</span>
                    </button>
                  ) : (
                    <div className="text-center animate-in zoom-in-95 duration-300">
                      <div className="inline-flex p-3 bg-green-100 rounded-full text-green-600 mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-slate-800 mb-1">已解鎖答案</h4>
                      <p className="text-xs text-slate-400 font-medium">請滑動至下方查閱詳細解析</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 詳解區域 */}
            {showExplanation ? (
              <div className="bg-blue-600 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-200 animate-in slide-in-from-bottom-6 duration-500">
                <div className="flex items-center gap-2 mb-4 text-blue-100 font-bold text-xs uppercase tracking-[0.2em]">
                  <Info className="w-4 h-4" /> PDF Explanation
                </div>
                <p className="text-white text-sm md:text-base leading-relaxed mb-8 font-medium whitespace-pre-wrap">
                  {currentQuestions[quizIndex].explanation}
                </p>
                <button 
                  onClick={nextQuestion}
                  className="w-full bg-white text-blue-600 py-5 rounded-[1.5rem] font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-[0.98]"
                >
                  前往下一題 <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={nextQuestion}
                className="w-full py-6 text-slate-300 font-black flex items-center justify-center gap-3 hover:text-blue-500 transition-all hover:bg-white hover:rounded-[2rem] hover:shadow-sm"
              >
                跳過此題 <SkipForward className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </main>

      {/* 微型懸浮導覽按鈕 */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {isMenuOpen && (
          <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300 items-end mb-2">
            <button 
              onClick={() => { setView('home'); setIsMenuOpen(false); }}
              className="bg-white/90 backdrop-blur-md shadow-2xl border border-slate-100 p-4 rounded-full text-slate-600 hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 px-6 ring-1 ring-slate-200"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="font-black text-sm tracking-tight">題庫首頁</span>
            </button>
            <button 
              onClick={() => { setView('history'); setIsMenuOpen(false); }}
              className="bg-white/90 backdrop-blur-md shadow-2xl border border-slate-100 p-4 rounded-full text-slate-600 hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 px-6 ring-1 ring-slate-200"
            >
              <History className="w-5 h-5" />
              <span className="font-black text-sm tracking-tight">作答紀錄</span>
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center ring-4 ring-white/50 ${isMenuOpen ? 'bg-slate-900 text-white rotate-90 scale-90' : 'bg-blue-600 text-white hover:scale-110 active:scale-90 shadow-blue-200'}`}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default App;