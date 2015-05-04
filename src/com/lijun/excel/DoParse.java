package com.lijun.excel;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileFilter;

import org.apache.commons.io.filefilter.FileFilterUtils;

import com.lijun.excel.Model.Bar;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @author LiJun
 * @created 2015-4-12
 */
public class DoParse extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = -3266132568733534663L;

	public JSONArray parseExcel(String filePath) throws IOException {
        String excel2003_2007 = "D:\\test/uploads/"+filePath;
        String excel2010 = Common.STUDENT_INFO_XLSX_PATH;
        
        File dir = new File(excel2003_2007);
        if (dir.isDirectory()) {
        	File[] dirFile = dir.listFiles();
            for (File f : dirFile) {
                if (f.getName().endsWith(".xls"))
                	excel2003_2007 = f.getAbsolutePath();
            }  
		}
        
        // read the 2003-2007 excel
        List<Object> list = new ReadExcel().readExcel(excel2003_2007);
        List<Object> rtJson1 = new ArrayList();
        List<Object> rtJson2 = new ArrayList();
        if (list != null) {
            for (Object column: list) {
            	JSONArray jsonArray = JSONArray.fromObject(column);
                rtJson1.add(jsonArray);
            }
        }
        JSONArray jsonObj = JSONArray.fromObject(rtJson1);
        // read the 2010 excel
//        List<Object> list1 = new ReadExcel().readExcel(excel2010);
//        if (list1 != null) {
//        	for (Object column: list) {
//            	JSONArray jsonArray = JSONArray.fromObject(column);
//                rtJson2.add(jsonArray);
//            }
//        }
        return jsonObj;
    }
	
	@Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException
    {
		String filePath = req.getParameter("filePath");
		resp.setHeader("Content-type", "text/html;charset=UTF-8"); 
		resp.getWriter().print(parseExcel(filePath));
    }
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		String filePath = req.getParameter("filePath");
		resp.setHeader("Content-type", "text/html;charset=UTF-8"); 
		resp.getWriter().print(parseExcel(filePath));
	}
}
