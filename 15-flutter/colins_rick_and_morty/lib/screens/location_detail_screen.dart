import 'package:flutter/material.dart';
import "../models/location.dart";
import "../widgets/key_value.dart";

class LocationDetailScreen extends StatelessWidget {
  const LocationDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final _location = ModalRoute.of(context)!.settings.arguments as Location;

    return Scaffold(
      appBar: AppBar(title: Text(_location.name)),
      body: SingleChildScrollView(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          KeyValue(
              displayKey: "Episode Number",
              displayValue: _location.id.toString()),
          KeyValue(displayKey: "Name", displayValue: _location.name),
          KeyValue(displayKey: "Type", displayValue: _location.type),
          KeyValue(displayKey: "Dimension", displayValue: _location.dimension),

          Container(
              margin: const EdgeInsets.all(8),
              child: Text(
                "Characters",
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              )),
          Center(
            child: Wrap(
              spacing: 5,
              runSpacing: 4,
              children: _location.residents
                  .map((character) => CircleAvatar(
                        radius: 20,
                        backgroundImage: NetworkImage(
                            "https://rickandmortyapi.com/api/character/avatar/${character.toString().split("/").last}.jpeg"),
                        backgroundColor: Colors.transparent,
                      ))
                  .toList(),
            ),
          )
        ],
      )),
    );
  }
}
