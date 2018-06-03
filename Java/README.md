# React Flux React-Router Redux

## 目录

- JAVA基础
  - [反射reflect](#反射reflect)
  - [注解Annontation](#注解Annontation)
  
- Spring
  - [控制反转IOC](#控制反转IOC)
  - [AOP](#AOP)
  
## JAVA基础

### 反射reflect

反射是很多高级应用的基础，包括注解和spring的ioc，通过另一种方式获取类的一些信息

* class类其实也是对象， 任何一个类都是java.lang.Class类的实例对象，有三种表达方式

```java
Class Foo {...};
Foo fool1 = new Foo();   // 创建对象是静态加载类
Class c1 = Foo.class;
Class c2 = fool1.getClass();
Class c3 = Class.forName("com.imooc.reflect.Foo") // 类的全称

c1 == c2 == c3 // true
```
* 通过类类型可以创造类的实例

```java
c1.newInstance()
```

* 基本的数据类型，void关键字d都存在类类型

* 反射的一些api

```java
// 获取类的名称
getName()
// 获取类的所有public的方法，包括继承而来的方法
getMethods()
// 不包含继承而来的方法
getDeclaredMethods()
// 获取成员变量 java.lang.reflect.field
getFields()  // 获取所有public的成员变量
getDeclaredFields() // 获取该类自己声明的成员变量
// 构造方法   java.lang.reflect.field
getConstructor()
getDeclaredConstructor()
```
* 获取某个方法
```java
getMethod(name, parameterTypes)
getDeclaredMethod()

// 对方法进行反射操作
Method M = c.getMethod("print", int.class, int.class);
Object o = m.invoke(obj, arg)
```

* java中集合的范型，是防止错误输入的，只在编译的时候有效，绕过编译无效。反射可以绕过编译的，都是在运行时的。

### 注解Annontation

* Annontation像一种修饰符一样，应用于包、类型、构造方法、方法、成员变量、参数及本地变量的声明语句中。包含在 java.lang.annotation 包中。

* 注解原理：  
注解本质是一个继承了Annotation的特殊接口，其具体实现类是Java运行时生成的动态代理类。而我们通过反射获取注解时，返回的是Java运行时生成的动态代理对象$Proxy1。通过代理对象调用自定义注解（接口）的方法，会最终调用AnnotationInvocationHandler的invoke方法。该方法会从memberValues这个Map中索引出对应的值。而memberValues的来源是Java常量池。

* 元注解定义  
java.lang.annotation提供了四种元注解，专门注解其他的注解（在自定义注解的时候，需要使用到元注解

* @Retention– 定义该注解的生命周期
  1. RetentionPolicy.SOURCE : 在编译阶段丢弃。这些注解在编译结束之后就不再有任何意义，所以它们不会写入字节码。@Override, @SuppressWarnings都属于这类注解。
  2. RetentionPolicy.CLASS : 在类加载的时候丢弃。在字节码文件的处理中有用。注解默认使用这种方式
  3. RetentionPolicy.RUNTIME : 始终不会丢弃，运行期也保留该注解，因此可以使用反射机制读取该注解的信息。我们自定义的注解通常使用这种方式。

* Target – 表示该注解用于什么地方。默认值为任何元素，表示该注解用于任何地方
  1. ElementType.CONSTRUCTOR:用于描述构造器
  2. ElementType.FIELD:成员变量、对象、属性（包括enum实例）
  3. ElementType.LOCAL_VARIABLE:用于描述局部变量
  4. ElementType.METHOD:用于描述方法
  5. ElementType.PACKAGE:用于描述包
  6. ElementType.PARAMETER:用于描述参数
  7. ElementType.TYPE:用于描述类、接口(包括注解类型) 或enum声明

* @Documented –注解是否将包含在JavaDoc中

* @Inherited – 是否允许子类继承该注解

* 自定义注解
  1. @interface关键字定义注解
  2. 成员以无参无异常方式声明，可以用default为成员变量指定一个默认值
  3. 成员类型是受限的，合法的类型包括原始类型及String,Class,Annotation,Enumeration
  4. 如果注解只有一个成员，则成员名必须取名为value(),使用时可以忽略成员名和赋值名=
  5. 注解类可以没有成员，没有成员的注解为标示注解
```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Description {
  String desc();
  String author();
  int age() default 18;
}
```

* 使用注解  
@<注解名>（<成员名1>=<成员值1>,...）

* 解析注解
  1. 使用类加载器加载类, Class c = Class.forName("全路径")
  2. 找到类上面的注解实例, boolean isExist = c.isAnnotationPresent(Description.class), getAnnotation(Description.class)
  3. 找到方法上的注解， Description d =  (Description)c.getAnnotations(Description.class)
  4. 找到方法上的注解， Method[] ms = c.getMethods()
  5. 使用 Systen.out.println(d.value())

## Spring

### 
### AOP

