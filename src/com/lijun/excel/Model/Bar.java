package com.lijun.excel.Model;

/**
 * @author LiJun
 * @created 2015-4-25 </br>
 * 柱状图数据模型
 */
public class Bar {
    /**
     * name 横坐标数值名
     */
    private String name;
    /**
     * value 数值
     */
    private String value;
    
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

}
