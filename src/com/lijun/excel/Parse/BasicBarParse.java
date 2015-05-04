package com.lijun.excel.Parse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.lijun.excel.Common;
import com.lijun.excel.ReadExcel;
import com.lijun.excel.Model.Bar;

public class BasicBarParse {
	
//	public JSONArray parseExcel() throws IOException {
//        String excel2003_2007 = Common.STUDENT_INFO_XLS_PATH;
//        String excel2010 = Common.STUDENT_INFO_XLSX_PATH;
//        // read the 2003-2007 excel
//        List<Object> list = new ReadExcel().readExcel(excel2003_2007);
//        List<Object> rtJson = new ArrayList();
//        if (list != null) {
//            for (Bar bar : list) {
//                System.out.println("name : " + bar.getName() + ", value : " + bar.getValue());
//                JSONObject jsonObject = JSONObject.fromObject(bar);
//                rtJson.add(jsonObject);
//            }
//        }
//        JSONArray jsonObj = JSONArray.fromObject(rtJson);
//        System.out.println("======================================");
//        // read the 2010 excel
//        List<Bar> list1 = new ReadExcel().readExcel(excel2010);
//        if (list1 != null) {
//            for (Bar bar : list1) {
//                System.out.println("name : " + bar.getName() + ", value : " + bar.getValue());
//            }
//        }
//        return jsonObj;
//    }
}
