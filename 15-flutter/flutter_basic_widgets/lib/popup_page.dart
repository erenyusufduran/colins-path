import 'package:flutter/material.dart';

class PopUpPage extends StatefulWidget {
  const PopUpPage({super.key});

  @override
  State<PopUpPage> createState() => _PopUpPageState();
}

class _PopUpPageState extends State<PopUpPage> {
  String _selectedCity = "";
  List<String> colors = ["Mavi", "Yesil", "Kırmızı", "Sarı"];
  @override
  Widget build(BuildContext context) {
    return Center(
        child: PopupMenuButton<String>(itemBuilder: (BuildContext context) {
      return colors.map(
          (String color) => PopupMenuItem(child: Text(color), value: color)).toList();
      // return <PopupMenuEntry<String>>[
      //   PopupMenuItem(child: Text("Ankara"), value: "Ankara"),
      //   PopupMenuItem(child: Text("Istanbul"), value: "Istanbul"),
      //   PopupMenuItem(child: Text("Sivas"), value: "Sivas"),
      // ];
    }, onSelected: (String city) {
      setState(() {
        _selectedCity = city;
      });
    }));
  }
}
