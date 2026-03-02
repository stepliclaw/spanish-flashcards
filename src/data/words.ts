import type { Word } from '../types';

export const defaultWords: Word[] = [
  // Greetings - 問候
  { id: '1', spanish: 'Hola', chinese: '你好', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '2', spanish: 'Buenos días', chinese: '早安', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '3', spanish: 'Buenas tardes', chinese: '下午好', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '4', spanish: 'Buenas noches', chinese: '晚安', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '5', spanish: 'Adiós', chinese: '再見', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '6', spanish: 'Gracias', chinese: '謝謝', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '7', spanish: 'Por favor', chinese: '請', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '8', spanish: 'De nada', chinese: '不客氣', category: 'greetings', timesReviewed: 0, lastReviewed: null, mastered: false },

  // Numbers - 數字
  { id: '9', spanish: 'Uno', chinese: '一', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '10', spanish: 'Dos', chinese: '二', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '11', spanish: 'Tres', chinese: '三', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '12', spanish: 'Cuatro', chinese: '四', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '13', spanish: 'Cinco', chinese: '五', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '14', spanish: 'Seis', chinese: '六', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '15', spanish: 'Siete', chinese: '七', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '16', spanish: 'Ocho', chinese: '八', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '17', spanish: 'Nueve', chinese: '九', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '18', spanish: 'Diez', chinese: '十', category: 'numbers', timesReviewed: 0, lastReviewed: null, mastered: false },

  // Colors - 顏色
  { id: '19', spanish: 'Rojo', chinese: '紅色', category: 'colors', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '20', spanish: 'Azul', chinese: '藍色', category: 'colors', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '21', spanish: 'Verde', chinese: '綠色', category: 'colors', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '22', spanish: 'Amarillo', chinese: '黃色', category: 'colors', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '23', spanish: 'Negro', chinese: '黑色', category: 'colors', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '24', spanish: 'Blanco', chinese: '白色', category: 'colors', timesReviewed: 0, lastReviewed: null, mastered: false },

  // Family - 家庭
  { id: '25', spanish: 'Padre', chinese: '父親', category: 'family', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '26', spanish: 'Madre', chinese: '母親', category: 'family', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '27', spanish: 'Hijo', chinese: '兒子', category: 'family', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '28', spanish: 'Hija', chinese: '女兒', category: 'family', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '29', spanish: 'Hermano', chinese: '兄弟', category: 'family', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '30', spanish: 'Hermana', chinese: '姐妹', category: 'family', timesReviewed: 0, lastReviewed: null, mastered: false },

  // Food - 食物
  { id: '31', spanish: 'Agua', chinese: '水', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '32', spanish: 'Pan', chinese: '麵包', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '33', spanish: 'Carne', chinese: '肉', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '34', spanish: 'Arroz', chinese: '米飯', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '35', spanish: 'Manzana', chinese: '蘋果', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '36', spanish: 'Naranja', chinese: '橘子', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '37', spanish: 'Café', chinese: '咖啡', category: 'food', timesReviewed: 0, lastReviewed: null, mastered: false },

  // Common phrases - 常用句子
  { id: '38', spanish: '¿Cómo estás?', chinese: '你好嗎？', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '39', spanish: 'Bien, gracias', chinese: '很好，謝謝', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '40', spanish: '¿Cómo te llamas?', chinese: '你叫什麼名字？', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '41', spanish: 'Me llamo...', chinese: '我叫...', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '42', spanish: 'Mucho gusto', chinese: '很高興認識你', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '43', spanish: '¿Dónde está...?', chinese: '...在哪裡？', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '44', spanish: 'No entiendo', chinese: '我不懂', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '45', spanish: '¿Habla inglés?', chinese: '你會說英語嗎？', category: 'phrases', timesReviewed: 0, lastReviewed: null, mastered: false },

  // Days of the week - 星期
  { id: '46', spanish: 'Lunes', chinese: '星期一', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '47', spanish: 'Martes', chinese: '星期二', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '48', spanish: 'Miércoles', chinese: '星期三', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '49', spanish: 'Jueves', chinese: '星期四', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '50', spanish: 'Viernes', chinese: '星期五', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '51', spanish: 'Sábado', chinese: '星期六', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
  { id: '52', spanish: 'Domingo', chinese: '星期日', category: 'days', timesReviewed: 0, lastReviewed: null, mastered: false },
];

export const categories = [
  'greetings',
  'numbers',
  'colors',
  'family',
  'food',
  'phrases',
  'days',
];

export const categoryLabels: Record<string, string> = {
  greetings: '問候',
  numbers: '數字',
  colors: '顏色',
  family: '家庭',
  food: '食物',
  phrases: '常用句子',
  days: '星期',
};