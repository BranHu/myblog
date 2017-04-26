import React from 'react';
import styles from './app.css';//导入css样式文件

const App = () => (
	//这里引用了css文件
  <div className={styles.app}>
    <h2>Hello, this is amazing webpack。</h2>
  </div>
);

export default App;