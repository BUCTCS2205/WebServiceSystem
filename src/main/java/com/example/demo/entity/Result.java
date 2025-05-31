package com.example.demo.entity;

public class Result {
    private static final String SUCCESS = "200";
    private static final String ERROR = "500";

    private String code;
    private String message;
    private Object data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Result() {
    }

    public Result(String code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    public static Result error(String message){
        return new Result(ERROR,message,null);
    }
    public static Result success(Object data){
        return new Result(SUCCESS,"success",data);
    }
    public static Result success(){
        return new Result(SUCCESS,"success",null);
    }
}
